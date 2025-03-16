import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenType, User } from '@prisma/client';
import { RegisterUserDto } from './dtos/register-user.dto';
import { VerifyEmailDto } from './dtos/verify-email.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { EntityNotFoundException } from '@/common/exceptions/entity-not-found.exception';
import { JwtPayload } from '@/common/guards/jwt/jwt.payload';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private emailService: EmailService,
		private userService: UserService,
		private tokenService: TokenService,
		private configService: ConfigService,
	) {}

	async register(data: RegisterUserDto) {
		const user = await this.userService.getUserByEmail(data.email);

		if (user) {
			throw new BadRequestException('User is already registered');
		}

		const token = this.generateEmailToken();

		const newUser = await this.userService.createUser({
			...data,
			password: await bcrypt.hash(
				data.password,
				await bcrypt.genSalt(10),
			),
			tokens: {
				create: {
					token,
					tokenType: TokenType.EMAIL,
				},
			},
		});

		await this.requestEmailVerification(
			newUser.email,
			token,
			TokenType.EMAIL,
		);

		return newUser;
	}

	private generateEmailToken() {
		const token: string = Array(4)
			.fill(null)
			.map(() => `${Math.floor(Math.random() * 10)}`)
			.join('');
		return token;
	}

	async login(user: Omit<User, 'password'>) {
		await this.tokenService.deleteUserTokens(user.email, TokenType.REFRESH);
		const tokens = this.generateTokens(user);
		const hashedToken = await bcrypt.hash(
			tokens.refreshToken,
			await bcrypt.genSalt(10),
		);

		await this.userService.updateUserById(user.id, {
			tokens: {
				create: {
					token: hashedToken,
					tokenType: TokenType.REFRESH,
				},
			},
		});

		return tokens;
	}

	private async requestEmailVerification(
		email: string,
		token: string,
		tokenType: TokenType,
	) {
		const title =
			tokenType === TokenType.EMAIL
				? 'Email verification'
				: 'Password reset';
		await this.emailService.sendEmail({
			to: email,
			subject: title,
			message: `Your ${title.toLowerCase()} code: ${token}`,
		});

		new Promise((resolve) => {
			setTimeout(() => {
				resolve(this.tokenService.deleteUserTokens(email, tokenType));
			}, 3600 * 1000);
		});
	}

	async resendEmailVerification(email: string, tokenType: TokenType) {
		const user = await this.userService.getUserByEmail(email);

		if (!user) {
			throw new BadRequestException('User is not registered yet');
		}
		if (user.isVerified === true && tokenType === TokenType.EMAIL) {
			throw new BadRequestException('User is already verified');
		}

		const token = user.tokens.find(
			(token) => token.tokenType === tokenType,
		);

		if (token && Date.now() - token.createdAt.getTime() < 60 * 1000) {
			throw new BadRequestException('Too many actions');
		}

		if (token) {
			await this.tokenService.deleteUserTokens(email, tokenType);
		}

		const newToken = this.generateEmailToken();

		await this.userService.updateUserById(user.id, {
			tokens: {
				create: {
					token: newToken,
					tokenType: tokenType,
				},
			},
		});

		await this.requestEmailVerification(email, newToken, tokenType);
	}

	async verifyEmail(data: VerifyEmailDto) {
		const user = await this.userService.getUserByEmail(data.email);

		if (!user) {
			throw new BadRequestException('User is not registered yet');
		}

		const token = user.tokens.find(
			(token) =>
				token.token === data.token &&
				token.tokenType === TokenType.EMAIL,
		);

		if (!token) {
			throw new BadRequestException('Wrong token value');
		}

		const verifiedUser = await this.userService.updateUserById(user.id, {
			isVerified: true,
			tokens: {
				deleteMany: {
					tokenType: TokenType.EMAIL,
				},
			},
		});

		return verifiedUser;
	}

	async changePassword(email: string, data: ChangePasswordDto) {
		const user = await this.userService.getUserByEmail(email);
		if (!user) {
			throw new EntityNotFoundException('User', 'email');
		}

		const isMatch = await bcrypt.compare(data.oldPassword, user.password);
		if (!isMatch) {
			throw new BadRequestException('Current password is incorrect');
		}

		const hashedNewPassword = await bcrypt.hash(
			data.newPassword,
			await bcrypt.genSalt(10),
		);
		return this.userService.updateUserById(user.id, {
			password: hashedNewPassword,
		});
	}

	async refresh(user: Omit<User, 'password'>) {
		return this.login(user);
	}

	async logout(userEmail: string) {
		await this.tokenService.deleteUserTokens(userEmail, TokenType.REFRESH);
	}

	private generateTokens(user: Omit<User, 'password'>) {
		const payload: JwtPayload = {
			email: user.email,
			role: user.role,
			sub: user.id,
		};

		return {
			accessToken: this.jwtService.sign(payload),
			refreshToken: this.jwtService.sign(payload, {
				expiresIn: this.configService.get<string>('jwt.refreshTTL'),
			}),
		};
	}

	async verifyPasswordReset(data: VerifyEmailDto) {
		const user = await this.userService.getUserByEmail(data.email);

		if (!user) {
			throw new BadRequestException('User is not registered yet');
		}

		const token = user.tokens.find(
			(token) =>
				token.token === data.token &&
				token.tokenType === TokenType.PASSWORD,
		);

		if (!token) {
			throw new BadRequestException('Wrong token value');
		}

		await this.tokenService.deleteUserTokens(
			data.email,
			TokenType.PASSWORD,
		);

		const payload: JwtPayload = {
			email: user.email,
			role: user.role,
			sub: user.id,
		};

		return {
			resetToken: this.jwtService.sign(payload, {
				expiresIn: '1h',
			}),
		};
	}

	async resetPassword(userId: string, data: ResetPasswordDto) {
		return this.userService.updateUserById(userId, {
			password: await bcrypt.hash(
				data.password,
				await bcrypt.genSalt(10),
			),
		});
	}
}
