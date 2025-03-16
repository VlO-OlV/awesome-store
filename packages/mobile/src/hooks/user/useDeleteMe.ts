import { useMutation } from '@tanstack/react-query';
import { userService } from 'src/services/user';
import { showToast } from '../utils';
import { useAuthStore } from 'src/stores/auth';

export const useDeleteMe = () => {
	const { removeTokens } = useAuthStore();

	return useMutation({
		mutationFn: async () => {
			return await userService.deleteMe();
		},
		onSuccess: () => {
			showToast('success', 'Account deleted');
			removeTokens();
		},
	});
};
