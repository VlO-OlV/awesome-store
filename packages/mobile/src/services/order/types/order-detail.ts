import { Product } from 'src/services/product/types/product';

export interface OrderDetail {
	id: string;
	productId: string;
	quantity: number;
	purchasePrice: number;
}

export interface FullOrderDetail extends OrderDetail {
	product: Product;
}
