import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from '@/common/guards/local/local.guard';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { TokenType, User } from '@prisma/client';
import { RegisterUserDto } from './dtos/register-user.dto';
import { VerifyEmailDto } from './dtos/verify-email.dto';
import { ResendEmailVerificationDto } from './dtos/resend-email-verification.dto';
import { Public } from '@/common/decorators/public.decorator';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { RefreshGuard } from '@/common/guards/jwt/refresh/refresh.guard';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Controller({
	path: 'auth',
	version: '1',
})
export class AuthConroller {
	constructor(private authService: AuthService) {}

	@Public()
	@Post('/register')
	async register(@Body() body: RegisterUserDto) {
		return this.authService.register(body);
	}

	@Public()
	@UseGuards(LocalGuard)
	@Post('/login')
	async login(@GetUser() user: Omit<User, 'password'>) {
		return this.authService.login(user);
	}

	@Public()
	@Post('/emailVerification/resend')
	async resendEmailVerification(@Body() body: ResendEmailVerificationDto) {
		return this.authService.resendEmailVerification(
			body.email,
			TokenType.EMAIL,
		);
	}

	@Public()
	@Post('/emailVerification/verify')
	async verifyEmail(@Body() body: VerifyEmailDto) {
		return this.authService.verifyEmail(body);
	}

	@Patch('/changePassword')
	async changePassword(
		@GetUser('email') email: string,
		@Body() body: ChangePasswordDto,
	) {
		return this.authService.changePassword(email, body);
	}

	@Public()
	@UseGuards(RefreshGuard)
	@Post('/refresh')
	async refresh(@GetUser() user: Omit<User, 'password'>) {
		return this.authService.refresh(user);
	}

	@Post('/logout')
	async logout(@GetUser('email') userEmail: string) {
		return this.authService.logout(userEmail);
	}

	@Public()
	@Post('/forgotPassword')
	async forgotPassword(@Body() body: ResendEmailVerificationDto) {
		return this.authService.resendEmailVerification(
			body.email,
			TokenType.PASSWORD,
		);
	}

	@Public()
	@Post('/forgotPassword/verify')
	async verifyPasswordReset(@Body() body: VerifyEmailDto) {
		return this.authService.verifyPasswordReset(body);
	}

	@Patch('/forgotPassword/reset')
	async resetPassword(
		@GetUser('id') userId: string,
		@Body() body: ResetPasswordDto,
	) {
		return this.authService.resetPassword(userId, body);
	}
}
