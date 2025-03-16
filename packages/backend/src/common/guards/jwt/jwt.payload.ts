import { UserRole } from '@prisma/client';

export class JwtPayload {
	email: string;
	role: UserRole;
	sub: string;
}
