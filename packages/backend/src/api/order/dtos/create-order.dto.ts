import { CreateOrderDetailInOrderDto } from '@/api/order-detail/dtos/create-order-detail.dto';
import { DeliveryStatus, PaymentStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
	IsEnum,
	IsNotEmpty,
	IsOptional,
	ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
	@IsOptional()
	@IsEnum(PaymentStatus)
	paymentStatus?: PaymentStatus;

	@IsOptional()
	@IsEnum(DeliveryStatus)
	deliveryStatus?: DeliveryStatus;

	@IsNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => CreateOrderDetailInOrderDto)
	orderDetails: CreateOrderDetailInOrderDto[];
}
