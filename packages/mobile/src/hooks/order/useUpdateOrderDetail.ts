import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showToast } from '../utils';
import { UpdateOrderDetailData } from 'src/services/order/types';
import { orderService } from 'src/services/order';

export const useUpdateOrderDetail = (orderId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (
			data: UpdateOrderDetailData & { orderDetailId: string },
		) => {
			return await orderService.updateOrderDetail(
				data.orderDetailId,
				data,
			);
		},
		onSuccess: () => {
			showToast('success', 'Order updated');
			return queryClient.invalidateQueries({
				queryKey: ['orders', orderId],
			});
		},
	});
};
