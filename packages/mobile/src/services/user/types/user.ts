import { UserRole } from './user-role';

export interface User {
	id: string;
	email: string;
	role: UserRole;
	isVerified: boolean;
	fullName: string;
	phone: string;
	address: string;
}
