import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateOrderDetailDto {
	@IsOptional()
	@IsNumber()
	@Min(1)
	quantity?: number;

	@IsOptional()
	@IsNumber()
	@Min(0)
	purchasePrice?: number;
}
