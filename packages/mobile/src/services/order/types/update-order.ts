import { DeliveryStatus } from './delivery-status';
import { PaymentStatus } from './payment-status';

export interface UpdateOrderData {
	paymentStatus?: PaymentStatus;
	deliveryStatus?: DeliveryStatus;
}
