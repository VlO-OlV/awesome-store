import { useQuery } from '@tanstack/react-query';
import { orderService } from 'src/services/order';

export const useGetOrder = (orderId: string) => {
	return useQuery({
		queryKey: ['orders', orderId],
		queryFn: async () => {
			return await orderService.getOrder(orderId);
		},
	});
};
