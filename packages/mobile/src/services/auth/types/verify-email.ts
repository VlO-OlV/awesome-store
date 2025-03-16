export interface VerifyEmailData {
	email: string;
	token: string;
}

export interface VerifyEmailResetResponse {
	resetToken: string;
}
