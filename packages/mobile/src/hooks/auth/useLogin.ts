import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';
import { authService } from 'src/services/auth';
import { LoginData } from 'src/services/auth/types';
import { HttpStatusCode } from 'src/shared/services/types';
import { useAuthStore } from 'src/stores/auth/auth.store';
import { showToast } from '../utils';

export const useLogin = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const { setTokens } = useAuthStore();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: LoginData) => {
			return await authService.login(data);
		},
		onSuccess: (data) => {
			setTokens(data.accessToken, data.refreshToken);
			showToast('success', 'Login successful');
			return queryClient.invalidateQueries({
				queryKey: ['users', 'me'],
			});
		},
		onError: (error, variables) => {
			if (
				'status' in error &&
				error.status === HttpStatusCode.BAD_REQUEST
			) {
				navigate(NAVIGATION_KEYS.VERIFICATION, {
					email: variables.email,
				});
			}
		},
	});
};
