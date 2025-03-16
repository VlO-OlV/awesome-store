import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from 'src/services/order';
import { showToast } from '../utils';
import { PaymentStatus } from 'src/services/order/types';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';

export const useMakeOrderPayment = (orderId: string) => {
	const { navigate } = useNavigation<StackNavigation>();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (orderId: string) => {
			return await orderService.makeOrderPayment(orderId);
		},
		onSuccess: (data) => {
			if (data.paymentStatus === PaymentStatus.FAILED) {
				showToast('error', 'Payment failed');
			} else {
				navigate(NAVIGATION_KEYS.SUCCESS_PRIVATE, {
					mainText: 'Payment successful!',
					buttonText: 'Ok',
					redirect: () =>
						navigate(NAVIGATION_KEYS.TABS_NAVIGATOR, {
							screen: NAVIGATION_KEYS.ORDERS,
						}),
					isIcon: true,
				});
			}
			return queryClient.invalidateQueries({
				queryKey: ['orders', orderId],
			});
		},
	});
};
