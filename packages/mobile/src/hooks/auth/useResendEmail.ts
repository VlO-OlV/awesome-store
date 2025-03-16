import { useMutation } from '@tanstack/react-query';
import { authService } from 'src/services/auth';
import { ResendEmailData } from 'src/services/auth/types';
import { showToast } from '../utils';

export const useResendEmail = () => {
	return useMutation({
		mutationFn: async (data: ResendEmailData) => {
			return await authService.resendEmail(data);
		},
		onSuccess: () => {
			showToast('success', 'Verification code sent');
		},
	});
};
