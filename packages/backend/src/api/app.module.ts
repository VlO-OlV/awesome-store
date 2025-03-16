import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration';
import { EmailModule } from './email/email.module';
import { PrismaModule } from '@/database/prisma.module';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { ProductModule } from './product/product.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessGuard } from '@/common/guards/jwt/access/access.guard';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { PaymentModule } from './payment/payment.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			envFilePath: ['.env'],
		}),
		PrismaModule,
		AuthModule,
		EmailModule,
		UserModule,
		TokenModule,
		ProductModule,
		OrderModule,
		OrderDetailModule,
		PaymentModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AccessGuard,
		},
	],
})
export class AppModule {}
