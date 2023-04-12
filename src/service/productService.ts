import {Product} from "../repository/productRepository";
import ProductRepository from "../repository/productRepository";


export class ProductService {
 private productRepository: ProductRepository
constructor(productRepository:ProductRepository) {
  this.productRepository = productRepository
}
  // Create a new product and add it to the repository
  async createProduct(product: Product): Promise<Product> {
    const existingProduct = await this.productRepository.createProduct(product);

    return existingProduct;
  }

  // Update an existing product in the repository
  async updateProduct(id: string, productUpdates: Partial<Product>): Promise<Product> {
    const result = await this.productRepository.updateProduct(id, productUpdates,);

    return result;
  }

  // Delete an existing product from the repository
  async deleteProduct(id: string): Promise<Product[]> {
    const result = await this.productRepository.deleteProduct(id);

    return result;
  }

  // Delete an existing product from the repository
  async deleteAllProduct(): Promise<Product[]> {
    const result = await this.productRepository.deleteAllProduct();

    return result;
  }

  // Get a product by its ID from the repository
  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.getProductById(id);

    return product;
  }

  // Get all products from the repository
  async getAllProducts(search?: string, limit?:string, page?:string,sort?:string): Promise<Product[]> {
    const products = await this.productRepository.getAllProducts(search,limit,page,sort);
    return products;
  }
}