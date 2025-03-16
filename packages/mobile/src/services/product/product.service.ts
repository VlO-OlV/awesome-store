import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import { HttpService } from 'src/shared/services/http.service';
import { Product } from './types/product';

class ProductService {
	constructor(private readonly httpService: HttpService) {
		this.httpService = httpService;
	}

	public async getProduct(productId: string) {
		return this.httpService.get<Product>(`products/${productId}`);
	}

	public async getAllProducts(query: string) {
		return this.httpService.get<Product[]>(`products?${query}`);
	}
}

export const productService = new ProductService(
	new HttpFactoryService().createHttpService(),
);
