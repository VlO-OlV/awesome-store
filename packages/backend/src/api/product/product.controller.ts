import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { GetProductsDto } from './dtos/get-products.dto';
import { RolesGuard } from '@/common/guards/roles/roles.guard';

@Controller({
	path: 'products',
	version: '1',
})
export class ProductController {
	constructor(private productService: ProductService) {}

	@UseGuards(RolesGuard)
	@Post()
	async createProduct(@Body() body: CreateProductDto) {
		return this.productService.createProduct(body);
	}

	@UseGuards(RolesGuard)
	@Patch('/:productId')
	async updateProduct(
		@Param('productId') productId: string,
		@Body() body: UpdateProductDto,
	) {
		return this.productService.updateProductById(productId, body);
	}

	@Get('/:productId')
	async getProduct(@Param('productId') productId: string) {
		return this.productService.getProductById(productId);
	}

	@Get()
	async getAllProducts(@Query() query: GetProductsDto) {
		return this.productService.getAllProducts(query);
	}

	@UseGuards(RolesGuard)
	@Delete('/:productId')
	async deleteProduct(@Param('productId') productId: string) {
		return this.productService.deleteProductById(productId);
	}
}
