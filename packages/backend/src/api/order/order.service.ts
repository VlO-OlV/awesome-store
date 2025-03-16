import { PrismaService } from '@/database/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { GetOrdersDto } from './dtos/get-orders.dto';
import { PaymentService } from '../payment/payment.service';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class OrderService {
	constructor(
		private prisma: PrismaService,
		private orderDetailService: OrderDetailService,
		private paymentService: PaymentService,
	) {}

	private include = {
		orderDetails: true,
		payment: true,
	};

	async createOrder(userId: string, data: CreateOrderDto) {
		const { orderDetails, ...order } = data;

		const newOrder = await this.prisma.order.create({
			data: {
				...order,
				userId,
			},
		});

		let newOrderDetails;
		try {
			newOrderDetails = await this.orderDetailService.createOrderDetails(
				orderDetails.map((orderDetail) => ({
					...orderDetail,
					orderId: newOrder.id,
				})),
			);
		} catch (error) {
			await this.prisma.order.delete({
				where: {
					id: newOrder.id,
				},
			});
			throw error;
		}

		return { ...newOrder, orderDetails: newOrderDetails };
	}

	async updateOrderById(orderId: string, data: UpdateOrderDto) {
		return this.prisma.order.update({
			where: {
				id: orderId,
			},
			data,
			include: this.include,
		});
	}

	async getOrdersByUser(userId: string, query: GetOrdersDto) {
		return this.prisma.order.findMany({
			where: {
				userId,
				paymentStatus: query.paymentStatus,
				deliveryStatus: query.deliveryStatus,
			},
			orderBy: {
				updatedAt: query.date,
			},
			include: this.include,
		});
	}

	async getOrderById(orderId: string) {
		const order = await this.prisma.order.findFirst({
			where: {
				id: orderId,
			},
		});
		const orderDetailsWithProducts =
			await this.orderDetailService.getOrderDetailsByOrderId(orderId);

		return { ...order, orderDetails: orderDetailsWithProducts };
	}

	async deleteOrderById(orderId: string) {
		await this.orderDetailService.validateOrderStatus(orderId);

		return this.prisma.order.delete({
			where: {
				id: orderId,
			},
			include: this.include,
		});
	}

	async makeOrderPayment(orderId: string) {
		const order = await this.getOrderById(orderId);
		if (order.paymentStatus === PaymentStatus.COMPLETE) {
			throw new BadRequestException('Order is already paid');
		}

		let paymentStatus: PaymentStatus = PaymentStatus.PENDING;
		if (Math.ceil(Math.random() * 10) < 3) {
			paymentStatus = PaymentStatus.FAILED;
		} else {
			paymentStatus = PaymentStatus.COMPLETE;
		}

		await this.paymentService.createPayment({ orderId });

		return this.updateOrderById(orderId, { paymentStatus });
	}
}
