import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import { HttpService } from 'src/shared/services/http.service';
import {
	ChangePasswordData,
	LoginData,
	LoginResponse,
	RegistrationData,
	ResendEmailData,
	ResetPasswordData,
	VerifyEmailData,
	VerifyEmailResetResponse,
} from './types';
import { User } from '../user/types';

class AuthService {
	constructor(private readonly httpService: HttpService) {
		this.httpService = httpService;
	}

	public async register(data: RegistrationData) {
		return this.httpService.post<void, RegistrationData>(
			'auth/register',
			data,
		);
	}

	public async login(data: LoginData) {
		return this.httpService.post<LoginResponse, LoginData>(
			'auth/login',
			data,
		);
	}

	public async resendEmail(data: ResendEmailData) {
		return this.httpService.post<void, ResendEmailData>(
			'auth/emailVerification/resend',
			data,
		);
	}

	public async verifyEmail(data: VerifyEmailData) {
		return this.httpService.post<void, VerifyEmailData>(
			'auth/emailVerification/verify',
			data,
		);
	}

	public async changePassword(data: ChangePasswordData) {
		return this.httpService.patch<User, ChangePasswordData>(
			'auth/changePassword',
			data,
		);
	}

	public async refresh() {
		return this.httpService.post<LoginResponse, void>(
			'auth/refresh',
			undefined,
		);
	}

	public async logout() {
		return this.httpService.post<void, void>('auth/logout', undefined);
	}

	public async forgotPassword(data: ResendEmailData) {
		return this.httpService.post<void, ResendEmailData>(
			'auth/forgotPassword',
			data,
		);
	}

	public async verifyPasswordReset(data: VerifyEmailData) {
		return this.httpService.post<VerifyEmailResetResponse, VerifyEmailData>(
			'auth/forgotPassword/verify',
			data,
		);
	}

	public async resetPassword(token: string, data: ResetPasswordData) {
		return this.httpService.patch<void, ResetPasswordData>(
			'auth/forgotPassword/reset',
			data,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
	}
}

export const authService = new AuthService(
	new HttpFactoryService().createHttpService(),
);
