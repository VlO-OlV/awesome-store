import { PrismaService } from '@/database/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dtos/create-order-detail.dto';
import { ProductService } from '../product/product.service';
import { DeliveryStatus, PaymentStatus } from '@prisma/client';
import { UpdateOrderDetailDto } from './dtos/update-order-detail.dto';
import { EntityNotFoundException } from '@/common/exceptions/entity-not-found.exception';

@Injectable()
export class OrderDetailService {
	constructor(
		private prisma: PrismaService,
		private productService: ProductService,
	) {}

	private include = {
		product: true,
	};

	async createOrderDetails(data: CreateOrderDetailDto[]) {
		const newOrderDetails = [];

		await this.validateOrderStatus(data[0].orderId);
		for (const orderDetail of data) {
			await this.validateOrderDetail(orderDetail);
		}
		for (const orderDetail of data) {
			const quantityDifference = -orderDetail.quantity;
			await this.productService.updateProductQuantityById(
				orderDetail.productId,
				quantityDifference,
			);
			newOrderDetails.push(
				await this.prisma.orderDetail.create({
					data: orderDetail,
					include: this.include,
				}),
			);
		}

		const totalAmount = newOrderDetails.reduce(
			(previousAmount, currentItem) => {
				return (
					previousAmount +
					currentItem.quantity * currentItem.purchasePrice
				);
			},
			0,
		);
		await this.updateOrderAmountById(data[0].orderId, totalAmount);

		return newOrderDetails;
	}

	async getOrderDetailById(orderDetailId: string) {
		return this.prisma.orderDetail.findFirst({
			where: {
				id: orderDetailId,
			},
			include: this.include,
		});
	}

	async getOrderDetailsByOrderId(orderId: string) {
		return this.prisma.orderDetail.findMany({
			where: { orderId },
			include: this.include,
		});
	}

	async updateOrderDetailById(
		orderDetailId: string,
		data: UpdateOrderDetailDto,
	) {
		const orderDetail = await this.getOrderDetailById(orderDetailId);

		if (
			orderDetail &&
			data.quantity &&
			orderDetail.product.quantity + orderDetail.quantity < data.quantity
		) {
			throw new BadRequestException(
				'This quantity of product is not available',
			);
		}
		await this.validateOrderStatus(orderDetail?.orderId as string);

		if (orderDetail) {
			const currentAmount =
				(data.purchasePrice ?? orderDetail.purchasePrice) *
				(data.quantity ?? orderDetail.quantity);
			const amountDifference =
				currentAmount -
				orderDetail.purchasePrice * orderDetail.quantity;
			const quantityDifference =
				orderDetail.quantity - (data.quantity ?? orderDetail.quantity);
			await this.updateOrderAmountById(
				orderDetail.orderId,
				amountDifference,
			);
			await this.productService.updateProductQuantityById(
				orderDetail.productId,
				quantityDifference,
			);
		}

		return this.prisma.orderDetail.update({
			where: {
				id: orderDetailId,
			},
			data,
			include: this.include,
		});
	}

	async deleteOrderDetailById(orderDetailId: string) {
		const orderDetail = await this.getOrderDetailById(orderDetailId);
		await this.validateOrderStatus(orderDetail?.orderId as string);

		if (orderDetail) {
			await this.updateOrderAmountById(
				orderDetail.orderId,
				-(orderDetail.purchasePrice * orderDetail.quantity),
			);
			await this.productService.updateProductQuantityById(
				orderDetail.productId,
				orderDetail.quantity,
			);
		}

		return this.prisma.orderDetail.delete({
			where: {
				id: orderDetailId,
			},
			include: this.include,
		});
	}

	private async validateOrderDetail(data: CreateOrderDetailDto) {
		const product = await this.productService.getProductById(
			data.productId,
		);
		const order = await this.prisma.order.findFirst({
			where: {
				id: data.orderId,
			},
		});

		if (!product) {
			throw new EntityNotFoundException('Product', 'id');
		}
		if (!order) {
			throw new EntityNotFoundException('Order', 'id');
		}
		if (product.quantity < data.quantity) {
			throw new BadRequestException(
				'This quantity of product is not available',
			);
		}
	}

	async validateOrderStatus(orderId: string) {
		const order = await this.prisma.order.findFirst({
			where: {
				id: orderId,
			},
		});

		if (
			order?.paymentStatus !== PaymentStatus.PENDING ||
			order?.deliveryStatus !== DeliveryStatus.PENDING
		) {
			throw new BadRequestException('You cannot edit this order');
		}
	}

	private async updateOrderAmountById(
		orderId: string,
		amountDifference: number,
	) {
		const order = await this.prisma.order.findFirst({
			where: {
				id: orderId,
			},
		});

		const totalAmount = (order?.totalAmount ?? 0) + amountDifference;

		await this.prisma.order.update({
			where: {
				id: orderId,
			},
			data: {
				totalAmount: Math.round(totalAmount * 100) / 100,
			},
		});
	}
}
