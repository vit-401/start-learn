import productRepository, {Product} from "../repository/productRepository";


class ProductService {

  // Create a new product and add it to the repository
  async createProduct(product: Product): Promise<Product> {
    const existingProduct = await productRepository.createProduct(product);

    return existingProduct;
  }

  // Update an existing product in the repository
  async updateProduct(id: string, productUpdates: Partial<Product>): Promise<Product> {
    const result = await productRepository.updateProduct(id, productUpdates,);

    return result;
  }

  // Delete an existing product from the repository
  async deleteProduct(id: string): Promise<Product[]> {
    const result = await productRepository.deleteProduct(id);

    return result;
  }

  // Delete an existing product from the repository
  async deleteAllProduct(): Promise<Product[]> {
    const result = await productRepository.deleteAllProduct();

    return result;
  }

  // Get a product by its ID from the repository
  async getProductById(id: string): Promise<Product> {
    const product = await productRepository.getProductById(id);

    return product;
  }

  // Get all products from the repository
  async getAllProducts(search?: string, limit?:string, page?:string): Promise<Product[]> {
    const products = await productRepository.getAllProducts(search,limit,page);
    return products;
  }
}

// Usage example:
// const products = productCollection.find({})
const productService = new ProductService();
//
// try {
//   const newProduct = repo.createProduct({id: '4', title: 'Product 4', price: 40});
//   console.log('Created product:', newProduct);
// } catch (error: any) {
//   console.error('Error creating product:', error.message);
// }
//
// try {
//   const updatedProduct = repo.updateProduct('1', {title: 'New name', price: 15});
//   console.log('Updated product:', updatedProduct);
// } catch (error: any) {
//   console.error('Error updating product:', error.message);
// }
//
// try {
//   repo.deleteProduct('2');
//   console.log('Deleted product with ID 2');
// } catch (error: any) {
//   console.error('Error deleting product:', error.message);
// }
//
// try {
//   const product = repo.getProductById('3');
//   console.log('Retrieved product:', product);
// } catch (error: any) {
//   console.error('Error retrieving product:', error.message);
// }
//
export default productService
//
// const allProducts = repo.getAllProducts();
// console.log('All products:', allProducts);
