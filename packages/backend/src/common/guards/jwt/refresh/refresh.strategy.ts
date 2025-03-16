import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '@/database/prisma.service';
import { AccessStrategy } from '../access/access.strategy';
import { TokenType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JwtPayload } from '../jwt.payload';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
	constructor(
		private configService: ConfigService,
		private prisma: PrismaService,
		private accessStrategy: AccessStrategy,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('jwt.secret') as string,
			passReqToCallback: true,
		});
	}

	async validate(request: Request, payload: JwtPayload) {
		const currentUser = await this.accessStrategy.validate(payload);

		const refreshToken = request.headers.authorization?.split(
			' ',
		)[1] as string;
		const validRefreshToken = await this.prisma.token.findFirst({
			where: {
				userId: currentUser.id,
				tokenType: TokenType.REFRESH,
			},
		});

		if (!validRefreshToken) {
			throw new UnauthorizedException();
		}
		await this.validateToken(refreshToken, validRefreshToken.token);

		return currentUser;
	}

	private async validateToken(token: string, hash: string) {
		const isMatched = await bcrypt.compare(token, hash);
		if (!isMatched) {
			throw new UnauthorizedException('Refresh token is incorrect');
		}
	}
}
