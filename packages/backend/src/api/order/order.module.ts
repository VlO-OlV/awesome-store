import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { IsExistMiddleware } from '@/common/middleware/is-exist/is-exist.middleware';
import { PrismaService } from '@/database/prisma.service';
import { OrderDetailModule } from '../order-detail/order-detail.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
	controllers: [OrderController],
	providers: [OrderService],
	exports: [OrderService],
	imports: [OrderDetailModule, PaymentModule],
})
export class OrderModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		const isExistMiddleware = new IsExistMiddleware(new PrismaService());

		consumer
			.apply(isExistMiddleware.use('order', 'orderId'))
			.exclude(
				{ path: 'v1/orders', method: RequestMethod.POST },
				{ path: 'v1/orders/my', method: RequestMethod.GET },
			)
			.forRoutes(OrderController);
	}
}
