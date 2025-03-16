import { useQuery } from '@tanstack/react-query';
import { userService } from 'src/services/user';

export const useGetMe = () => {
	return useQuery({
		queryKey: ['users', 'me'],
		queryFn: async () => {
			return await userService.getMe();
		},
	});
};
