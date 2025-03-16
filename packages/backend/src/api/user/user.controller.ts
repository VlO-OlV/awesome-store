import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller({
	path: 'users',
	version: '1',
})
export class UserController {
	constructor(private userService: UserService) {}

	@Get('/me')
	async getMe(@GetUser() user: Omit<User, 'password'>) {
		return user;
	}

	@Patch('/me')
	async updateMe(@GetUser('id') userId: string, @Body() body: UpdateUserDto) {
		return this.userService.updateUserById(userId, body);
	}

	@Delete('/me')
	async deleteMe(@GetUser('id') userId: string) {
		return this.userService.deleteUserById(userId);
	}
}
