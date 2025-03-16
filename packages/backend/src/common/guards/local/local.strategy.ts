import { PrismaService } from '@/database/prisma.service';
import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { EntityNotFoundException } from '@/common/exceptions/entity-not-found.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private prisma: PrismaService) {
		super({ usernameField: 'email' });
	}

	async validate(email: string, password: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				email,
			},
		});

		if (!user) {
			throw new EntityNotFoundException('User', 'email');
		}
		await this.validatePassword(password, user.password);

		if (!user.isVerified) {
			throw new BadRequestException('User is not verified');
		}

		const { password: excludedPassword, ...validUser } = user;
		return validUser;
	}

	private async validatePassword(password: string, hash: string) {
		const isMatch = await bcrypt.compare(password, hash);
		if (!isMatch) {
			throw new UnauthorizedException('Password is incorrect');
		}
	}
}
