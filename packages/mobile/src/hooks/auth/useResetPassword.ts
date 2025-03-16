import { useMutation } from '@tanstack/react-query';
import { authService } from 'src/services/auth';
import { ResetPasswordData } from 'src/services/auth/types';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';

export const useResetPassword = () => {
	const { navigate } = useNavigation<StackNavigation>();

	return useMutation({
		mutationFn: async ({
			token,
			...data
		}: ResetPasswordData & { token: string }) => {
			return await authService.resetPassword(token, data);
		},
		onSuccess: () => {
			navigate(NAVIGATION_KEYS.SUCCESS, {
				mainText: 'Password successfully changed!',
				buttonText: 'Sign In',
				redirect: () => navigate(NAVIGATION_KEYS.LOGIN),
			});
		},
	});
};
