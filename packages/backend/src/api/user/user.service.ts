import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	private include = {
		tokens: true,
	};

	async createUser(data: Prisma.UserUncheckedCreateInput) {
		return this.prisma.user.create({
			data,
			include: this.include,
			omit: {
				password: true,
			},
		});
	}

	async getUserByEmail(email: string) {
		return this.prisma.user.findFirst({
			where: { email },
			include: this.include,
		});
	}

	async updateUserById(id: string, data: Prisma.UserUncheckedUpdateInput) {
		return this.prisma.user.update({
			where: { id },
			data,
			omit: {
				password: true,
			},
		});
	}

	async deleteUserById(id: string) {
		return this.prisma.user.delete({
			where: { id },
			omit: {
				password: true,
			},
		});
	}
}
