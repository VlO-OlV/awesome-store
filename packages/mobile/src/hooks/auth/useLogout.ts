import { useMutation } from '@tanstack/react-query';
import { authService } from 'src/services/auth';
import { useAuthStore } from 'src/stores/auth';
import { useCartStore } from 'src/stores/cart';

export const useLogout = () => {
	const { removeTokens } = useAuthStore();
	const { clearCart } = useCartStore();

	return useMutation({
		mutationFn: async () => {
			return await authService.logout();
		},
		onSuccess: () => {
			removeTokens();
			clearCart();
		},
	});
};
