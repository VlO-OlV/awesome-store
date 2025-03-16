import { useMutation } from '@tanstack/react-query';
import { authService } from 'src/services/auth';
import { ResendEmailData } from 'src/services/auth/types';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';
import { showToast } from '../utils';

export const useForgotPassword = () => {
	const { navigate } = useNavigation<StackNavigation>();

	return useMutation({
		mutationFn: async (data: ResendEmailData) => {
			return await authService.forgotPassword(data);
		},
		onSuccess: (data, variables) => {
			showToast('success', 'Verification code sent');
			navigate(NAVIGATION_KEYS.VERIFICATION, {
				email: variables.email,
				isPasswordReset: true,
			});
		},
	});
};
