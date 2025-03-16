import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { OrderGuard } from '@/common/guards/order/order.guard';
import { GetOrdersDto } from './dtos/get-orders.dto';

@Controller({
	path: 'orders',
	version: '1',
})
export class OrderController {
	constructor(private orderService: OrderService) {}

	@Post()
	async createOrder(
		@GetUser('id') userId: string,
		@Body() body: CreateOrderDto,
	) {
		return this.orderService.createOrder(userId, body);
	}

	@UseGuards(OrderGuard)
	@Patch('/:orderId')
	async updateOrder(
		@Body() body: UpdateOrderDto,
		@Param('orderId') orderId: string,
	) {
		return this.orderService.updateOrderById(orderId, body);
	}

	@Get('/my')
	async getMyOrders(
		@GetUser('id') userId: string,
		@Query() query: GetOrdersDto,
	) {
		return this.orderService.getOrdersByUser(userId, query);
	}

	@UseGuards(OrderGuard)
	@Get('/:orderId')
	async getOrder(@Param('orderId') orderId: string) {
		return this.orderService.getOrderById(orderId);
	}

	@UseGuards(OrderGuard)
	@Delete('/:orderId')
	async deleteOrder(@Param('orderId') orderId: string) {
		return this.orderService.deleteOrderById(orderId);
	}

	@UseGuards(OrderGuard)
	@Post('/:orderId/payment')
	async makeOrderPayment(@Param('orderId') orderId: string) {
		return this.orderService.makeOrderPayment(orderId);
	}
}
