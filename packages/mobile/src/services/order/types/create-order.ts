import { CreateOrderDetailData } from './create-order-detail';
import { DeliveryStatus } from './delivery-status';
import { PaymentStatus } from './payment-status';

export interface CreateOrderData {
	paymentStatus?: PaymentStatus;
	deliveryStatus?: DeliveryStatus;
	orderDetails: CreateOrderDetailData[];
}
