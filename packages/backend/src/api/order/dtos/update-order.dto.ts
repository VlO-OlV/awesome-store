import { DeliveryStatus, PaymentStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateOrderDto {
	@IsOptional()
	@IsEnum(PaymentStatus)
	paymentStatus?: PaymentStatus;

	@IsOptional()
	@IsEnum(DeliveryStatus)
	deliveryStatus?: DeliveryStatus;
}
