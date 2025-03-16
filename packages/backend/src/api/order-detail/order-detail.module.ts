import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';
import { IsExistMiddleware } from '@/common/middleware/is-exist/is-exist.middleware';
import { PrismaService } from '@/database/prisma.service';
import { ProductModule } from '../product/product.module';

@Module({
	controllers: [OrderDetailController],
	providers: [OrderDetailService],
	exports: [OrderDetailService],
	imports: [ProductModule],
})
export class OrderDetailModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		const isExistMiddleware = new IsExistMiddleware(new PrismaService());

		consumer
			.apply(isExistMiddleware.use('orderDetail', 'orderDetailId'))
			.exclude({ path: 'v1/orderDetails', method: RequestMethod.POST })
			.forRoutes(OrderDetailController);
	}
}
