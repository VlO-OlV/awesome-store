import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import { HttpService } from 'src/shared/services/http.service';
import {
	CeateOrderDetailFullData,
	CreateOrderData,
	FullOrder,
	FullOrderDetail,
	OrderWithDetails,
	UpdateOrderData,
	UpdateOrderDetailData,
} from './types';

class OrderService {
	constructor(private readonly httpService: HttpService) {
		this.httpService = httpService;
	}

	public async createOrder(data: CreateOrderData) {
		return this.httpService.post<void, CreateOrderData>('orders', data);
	}

	public async updateOrder(orderId: string, data: UpdateOrderData) {
		return this.httpService.patch<void, UpdateOrderData>(
			`orders/${orderId}`,
			data,
		);
	}

	public async getOrder(orderId: string) {
		return this.httpService.get<FullOrder>(`orders/${orderId}`);
	}

	public async getMyOrders(query: string) {
		return this.httpService.get<OrderWithDetails[]>(`orders/my?${query}`);
	}

	public async makeOrderPayment(orderId: string) {
		return this.httpService.post<OrderWithDetails, void>(
			`orders/${orderId}/payment`,
			undefined,
		);
	}

	public async createOrderDetail(data: CeateOrderDetailFullData) {
		return this.httpService.post<void, CeateOrderDetailFullData>(
			'orderDetails',
			data,
		);
	}

	public async updateOrderDetail(
		orderDetailId: string,
		data: UpdateOrderDetailData,
	) {
		return this.httpService.patch<void, UpdateOrderDetailData>(
			`orderDetails/${orderDetailId}`,
			data,
		);
	}

	public async getOrderDetail(orderDetailId: string) {
		return this.httpService.get<FullOrderDetail>(
			`orderDetails/${orderDetailId}`,
		);
	}

	public async deleteOrderDetail(orderDetailId: string) {
		return this.httpService.delete<FullOrderDetail>(
			`orderDetails/${orderDetailId}`,
		);
	}
}

export const orderService = new OrderService(
	new HttpFactoryService().createHttpService(),
);
