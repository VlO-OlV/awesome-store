import { useQuery } from '@tanstack/react-query';
import { productService } from 'src/services/product';
import { GetProductsQuery } from 'src/services/product/types';
import { generateQuery } from '../utils';

export const useGetAllProducts = (query: GetProductsQuery) => {
	const fullQuery = generateQuery(query);

	return useQuery({
		queryKey: ['products', fullQuery],
		queryFn: async () => {
			return await productService.getAllProducts(fullQuery);
		},
	});
};
