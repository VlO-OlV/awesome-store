import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { GetProductsDto } from './dtos/get-products.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	async createProduct(data: Prisma.ProductUncheckedCreateInput) {
		return this.prisma.product.create({ data });
	}

	async updateProductById(
		id: string,
		data: Prisma.ProductUncheckedUpdateInput,
	) {
		return this.prisma.product.update({
			where: { id },
			data,
		});
	}

	async getProductById(id: string) {
		return this.prisma.product.findFirst({
			where: { id },
		});
	}

	async getAllProducts(data: GetProductsDto) {
		const page = +(data.page ?? 1);
		const pageSize = +(data.pageSize ?? 20);

		return this.prisma.product.findMany({
			where: {
				name: {
					contains: data.search,
					mode: 'insensitive',
				},
			},
			orderBy: {
				price: data.sort ?? undefined,
			},
			skip: (page - 1) * pageSize,
			take: pageSize,
		});
	}

	async deleteProductById(id: string) {
		return this.prisma.product.delete({
			where: { id },
		});
	}

	async updateProductQuantityById(
		productId: string,
		quantityDifference: number,
	) {
		const product = await this.getProductById(productId);
		const totalQuantity = (product?.quantity ?? 0) + quantityDifference;
		await this.updateProductById(productId, {
			quantity: Math.round(totalQuantity * 100) / 100,
		});
	}
}
