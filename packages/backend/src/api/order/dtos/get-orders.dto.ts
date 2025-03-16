import { DeliveryStatus, PaymentStatus } from '@prisma/client';
import { IsEnum, IsIn, IsOptional } from 'class-validator';

export class GetOrdersDto {
	@IsOptional()
	@IsEnum(PaymentStatus)
	paymentStatus?: PaymentStatus;

	@IsOptional()
	@IsEnum(DeliveryStatus)
	deliveryStatus?: DeliveryStatus;

	@IsOptional()
	@IsIn(['asc', 'desc'])
	date?: 'asc' | 'desc';
}
