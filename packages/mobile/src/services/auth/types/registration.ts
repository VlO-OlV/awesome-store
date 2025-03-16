import { UserRole } from 'src/services/user/types';

export interface RegistrationData {
	email: string;
	password: string;
	role: UserRole;
	fullName: string;
	phone: string;
	address: string;
}
