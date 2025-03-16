import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '@/database/prisma.service';
import { EntityNotFoundException } from '@/common/exceptions/entity-not-found.exception';
import { JwtPayload } from '../jwt.payload';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private prisma: PrismaService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('jwt.secret') as string,
		});
	}

	async validate(payload: JwtPayload) {
		if (!payload) {
			throw new UnauthorizedException('Session has expired');
		}

		const currentUser = await this.prisma.user.findFirst({
			where: { id: payload.sub },
		});
		if (!currentUser) {
			throw new EntityNotFoundException('User', 'id');
		}

		const { password, ...user } = currentUser;

		return user;
	}
}
