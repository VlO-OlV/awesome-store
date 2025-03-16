import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import { HttpService } from 'src/shared/services/http.service';
import { UpdateUserData, User } from './types';

class UserService {
	constructor(private readonly httpService: HttpService) {
		this.httpService = httpService;
	}

	public async getMe() {
		return this.httpService.get<User>('users/me');
	}

	public async updateMe(data: UpdateUserData) {
		return this.httpService.patch<User, UpdateUserData>('users/me', data);
	}

	public async deleteMe() {
		return this.httpService.delete<User>('users/me');
	}
}

export const userService = new UserService(
	new HttpFactoryService().createHttpService(),
);
