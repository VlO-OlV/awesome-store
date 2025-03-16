import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { IsExistMiddleware } from '@/common/middleware/is-exist/is-exist.middleware';
import { PrismaService } from '@/database/prisma.service';

@Module({
	controllers: [ProductController],
	providers: [ProductService],
	exports: [ProductService],
})
export class ProductModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		const isExistMiddleware = new IsExistMiddleware(new PrismaService());

		consumer
			.apply(isExistMiddleware.use('product', 'productId'))
			.exclude(
				{ path: 'v1/products', method: RequestMethod.POST },
				{ path: 'v1/products', method: RequestMethod.GET },
			)
			.forRoutes(ProductController);
	}
}
