import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { TokenType } from '@prisma/client';

@Injectable()
export class TokenService {
	constructor(private prisma: PrismaService) {}

	async deleteUserTokens(email: string, tokenType: TokenType) {
		return this.prisma.token.deleteMany({
			where: {
				user: { email },
				tokenType,
			},
		});
	}
}
