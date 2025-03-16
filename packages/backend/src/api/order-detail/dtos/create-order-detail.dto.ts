import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateOrderDetailInOrderDto {
	@IsNotEmpty()
	@IsUUID()
	productId: string;

	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	quantity: number;

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	purchasePrice: number;
}

export class CreateOrderDetailDto extends CreateOrderDetailInOrderDto {
	@IsNotEmpty()
	@IsUUID()
	orderId: string;
}
