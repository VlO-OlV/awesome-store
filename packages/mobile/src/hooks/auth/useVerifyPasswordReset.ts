import { useMutation } from '@tanstack/react-query';
import { authService } from 'src/services/auth';
import { VerifyEmailData } from 'src/services/auth/types';
import { showToast } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';

export const useVerifyPasswordReset = () => {
	const { navigate } = useNavigation<StackNavigation>();

	return useMutation({
		mutationFn: async (data: VerifyEmailData) => {
			return await authService.verifyPasswordReset(data);
		},
		onSuccess: (data) => {
			showToast('success', 'Email verified');
			navigate(NAVIGATION_KEYS.RESET_PASSWORD, {
				resetToken: data.resetToken,
			});
		},
	});
};
