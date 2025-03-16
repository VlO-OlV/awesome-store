import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaymentService {
	constructor(private prisma: PrismaService) {}

	async createPayment(data: Prisma.PaymentUncheckedCreateInput) {
		return this.prisma.payment.upsert({
			where: {
				orderId: data.orderId,
			},
			update: {
				transactionId: data.transactionId,
			},
			create: { ...data },
		});
	}
}
