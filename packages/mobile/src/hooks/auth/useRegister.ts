import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';
import { authService } from 'src/services/auth';
import { RegistrationData } from 'src/services/auth/types';
import { showToast } from '../utils';

export const useRegister = () => {
	const { navigate } = useNavigation<StackNavigation>();

	return useMutation({
		mutationFn: async (data: RegistrationData) => {
			return await authService.register(data);
		},
		onSuccess: (data, variables) => {
			showToast('success', 'Signup successful');
			navigate(NAVIGATION_KEYS.VERIFICATION, { email: variables.email });
		},
	});
};
