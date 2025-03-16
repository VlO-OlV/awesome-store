import { DeliveryStatus } from './delivery-status';
import { FullOrderDetail, OrderDetail } from './order-detail';
import { Payment } from './payment';
import { PaymentStatus } from './payment-status';

export interface Order {
	id: string;
	userId: string;
	totalAmount: number;
	paymentStatus: PaymentStatus;
	deliveryStatus: DeliveryStatus;
	payment?: Payment;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderWithDetails extends Order {
	orderDetails: OrderDetail[];
}

export interface FullOrder extends Order {
	orderDetails: FullOrderDetail[];
}
