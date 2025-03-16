import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dtos/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dtos/update-order-detail.dto';
import { OrderGuard } from '@/common/guards/order/order.guard';

@Controller({
	path: 'orderDetails',
	version: '1',
})
export class OrderDetailController {
	constructor(private orderDetailService: OrderDetailService) {}

	@UseGuards(OrderGuard)
	@Post()
	async createOrderDetail(@Body() body: CreateOrderDetailDto) {
		return this.orderDetailService.createOrderDetails([body]);
	}

	@UseGuards(OrderGuard)
	@Get('/:orderDetailId')
	async getOrderDetail(@Param('orderDetailId') orderDetailId: string) {
		return this.orderDetailService.getOrderDetailById(orderDetailId);
	}

	@UseGuards(OrderGuard)
	@Patch('/:orderDetailId')
	async updateOrderDetail(
		@Param('orderDetailId') orderDetailId: string,
		@Body() body: UpdateOrderDetailDto,
	) {
		return this.orderDetailService.updateOrderDetailById(
			orderDetailId,
			body,
		);
	}

	@UseGuards(OrderGuard)
	@Delete('/:orderDetailId')
	async deleteOrderDetail(@Param('orderDetailId') orderDetailId: string) {
		return this.orderDetailService.deleteOrderDetailById(orderDetailId);
	}
}
