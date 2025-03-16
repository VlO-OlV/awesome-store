import { useMutation } from '@tanstack/react-query';
import { authService } from 'src/services/auth';
import { ChangePasswordData } from 'src/services/auth/types';
import { showToast } from '../utils';

export const useChangePassword = () => {
	return useMutation({
		mutationFn: async (data: ChangePasswordData) => {
			return await authService.changePassword(data);
		},
		onSuccess: () => {
			showToast('success', 'Password changed');
		},
	});
};
