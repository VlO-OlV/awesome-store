export interface GetProductsQuery {
	page?: number;
	pageSize?: number;
	search?: string;
	sort?: 'asc' | 'desc';
}
