import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendEmailVerificationDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;
}
