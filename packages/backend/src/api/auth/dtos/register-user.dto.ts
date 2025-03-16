import { UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsEnum(UserRole)
	role: UserRole;

	@IsNotEmpty()
	@IsString()
	fullName: string;

	@IsNotEmpty()
	@IsString()
	phone: string;

	@IsNotEmpty()
	@IsString()
	address: string;
}
