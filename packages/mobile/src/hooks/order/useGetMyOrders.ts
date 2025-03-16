import { GetOrdersQuery } from 'src/services/order/types';
import { generateQuery } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { orderService } from 'src/services/order';

export const useGetMyOrders = (query: GetOrdersQuery) => {
	const fullQuery = generateQuery(query);

	return useQuery({
		queryKey: ['orders', fullQuery],
		queryFn: async () => {
			return await orderService.getMyOrders(fullQuery);
		},
	});
};
