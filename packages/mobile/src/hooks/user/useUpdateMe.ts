import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from 'src/services/user';
import { UpdateUserData } from 'src/services/user/types';
import { showToast } from '../utils';

export const useUpdateMe = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: UpdateUserData) => {
			return await userService.updateMe(data);
		},
		onSuccess: () => {
			showToast('success', 'Personal data updated');
			return queryClient.invalidateQueries({
				queryKey: ['users', 'me'],
			});
		},
	});
};
