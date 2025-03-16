export interface CreateOrderDetailData {
	productId: string;
	quantity: number;
	purchasePrice: number;
}

export interface CeateOrderDetailFullData extends CreateOrderDetailData {
	orderId: string;
}
