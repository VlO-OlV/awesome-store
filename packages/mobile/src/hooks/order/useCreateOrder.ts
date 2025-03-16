import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';
import { orderService } from 'src/services/order';
import { CreateOrderData } from 'src/services/order/types';
import { showToast } from '../utils';
import { useCartStore } from 'src/stores/cart';

export const useCreateOrder = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const { clearCart } = useCartStore();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateOrderData) => {
			return await orderService.createOrder(data);
		},
		onSuccess: () => {
			showToast('success', 'Order created');
			clearCart();
			navigate(NAVIGATION_KEYS.TABS_NAVIGATOR, {
				screen: NAVIGATION_KEYS.ORDERS,
			});
			return queryClient.invalidateQueries({ queryKey: ['orders'] });
		},
	});
};
