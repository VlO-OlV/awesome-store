import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Min,
} from 'class-validator';

export class CreateProductDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	category: string;

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	price: number;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsOptional()
	@IsNumber()
	@Min(0)
	quantity?: number;
}
