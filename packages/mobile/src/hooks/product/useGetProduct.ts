import { useQuery } from '@tanstack/react-query';
import { productService } from 'src/services/product';

export const useGetProduct = (productId: string) => {
	return useQuery({
		queryKey: ['products', productId],
		queryFn: async () => {
			return await productService.getProduct(productId);
		},
	});
};
