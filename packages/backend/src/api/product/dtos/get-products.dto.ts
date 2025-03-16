import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetProductsDto {
	@IsOptional()
	@IsNumberString()
	page?: number;

	@IsOptional()
	@IsNumberString()
	pageSize?: number;

	@IsOptional()
	@IsString()
	search?: string;

	@IsOptional()
	@IsIn(['asc', 'desc'])
	sort?: 'asc' | 'desc';
}
