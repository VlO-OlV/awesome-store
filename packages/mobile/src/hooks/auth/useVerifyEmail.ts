import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';
import { authService } from 'src/services/auth';
import { VerifyEmailData } from 'src/services/auth/types';

export const useVerifyEmail = () => {
	const { navigate } = useNavigation<StackNavigation>();

	return useMutation({
		mutationFn: async (data: VerifyEmailData) => {
			return await authService.verifyEmail(data);
		},
		onSuccess: () => {
			navigate(NAVIGATION_KEYS.SUCCESS, {
				mainText: 'Account successfully registered!',
				buttonText: 'Sign In',
				redirect: () => navigate(NAVIGATION_KEYS.LOGIN),
			});
		},
	});
};
