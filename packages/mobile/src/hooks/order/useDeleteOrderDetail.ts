import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from 'src/services/order';
import { showToast } from '../utils';

export const useDeleteOrderDetail = (orderId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (orderDetailId: string) => {
			return await orderService.deleteOrderDetail(orderDetailId);
		},
		onSuccess: () => {
			showToast('success', 'Order updated');
			return queryClient.invalidateQueries({
				queryKey: ['orders', orderId],
			});
		},
	});
};
