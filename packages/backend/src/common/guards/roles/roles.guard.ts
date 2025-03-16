import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const user: Omit<User, 'password'> = request.user;
		if (user.role !== UserRole.ADMIN) {
			throw new ForbiddenException(
				'You don\'t have permission to perform this action',
			);
		}
		return true;
	}
}
