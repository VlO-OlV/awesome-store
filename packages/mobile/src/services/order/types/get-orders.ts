import { DeliveryStatus } from './delivery-status';
import { PaymentStatus } from './payment-status';

export interface GetOrdersQuery {
	paymentStatus?: PaymentStatus;
	deliveryStatus?: DeliveryStatus;
	date?: 'asc' | 'desc';
}
