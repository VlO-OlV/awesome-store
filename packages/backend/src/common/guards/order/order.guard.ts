import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { User } from '@prisma/client';
import { RolesGuard } from '../roles/roles.guard';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class OrderGuard implements CanActivate {
	constructor(
		private moduleRef: ModuleRef,
		private prisma: PrismaService,
	) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const user: Omit<User, 'password'> = request.user;
		const orderId = request.params['orderId'] ?? request.body['orderId'];
		const orderDetailId = request.params['orderDetailId'];
		const rolesGuard = this.moduleRef.get(RolesGuard, { strict: false });

		try {
			await rolesGuard.canActivate(context);
			return true;
		} catch (error) {}

		const order = await this.getOrder(orderId, orderDetailId);
		if (!order || (order && order.userId === user.id)) {
			return true;
		}

		throw new ForbiddenException(
			'You don\'t have permission to perform this action',
		);
	}

	private async getOrder(orderId: string, orderDetailId: string) {
		if (orderId) {
			return this.prisma.order.findFirst({
				where: {
					id: orderId,
				},
			});
		}
		if (orderDetailId) {
			const orderDetail = await this.prisma.orderDetail.findFirst({
				where: {
					id: orderDetailId,
				},
			});
			return this.prisma.order.findFirst({
				where: {
					id: orderDetail?.orderId,
				},
			});
		}
		return null;
	}
}
