type Product = {
  id: string;
  title: string;
  price: number;
};

class ProductRepository {
  private products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }


  // Create a new product and add it to the repository
  createProduct(product: Product): Product {
    const existingProduct = this.products.find(p => p.id === product.id);
    if (existingProduct) {
      throw new Error('Product already exists');
    }

    this.products.push(product);
    return product;
  }

  // Update an existing product in the repository
  updateProduct(id: string, productUpdates: Partial<Product>): Product {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    const updatedProduct = {...this.products[productIndex], ...productUpdates};
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  // Delete an existing product from the repository
  deleteProduct(id: string): Product[] {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    this.products.splice(productIndex, 1);
    return this.products
  }

  // Get a product by its ID from the repository
  getProductById(id: string): Product {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  // Get all products from the repository
  getAllProducts(search?: string): Product[] {
    let products: Product[] = [];
    if (search) products = this.products.filter(product => product.title.includes(search.toString()))
    else products = this.products

    return products;
  }
}

// Usage example:
const products: Product[] = [
  {id: '1', title: 'Product 1', price: 10},
  {id: '2', title: 'Product 2', price: 20},
  {id: '3', title: 'Product 3', price: 30},
];

const repo = new ProductRepository(products);

try {
  const newProduct = repo.createProduct({id: '4', title: 'Product 4', price: 40});
  console.log('Created product:', newProduct);
} catch (error: any) {
  console.error('Error creating product:', error.message);
}

try {
  const updatedProduct = repo.updateProduct('1', {title: 'New name', price: 15});
  console.log('Updated product:', updatedProduct);
} catch (error: any) {
  console.error('Error updating product:', error.message);
}

try {
  repo.deleteProduct('2');
  console.log('Deleted product with ID 2');
} catch (error: any) {
  console.error('Error deleting product:', error.message);
}

try {
  const product = repo.getProductById('3');
  console.log('Retrieved product:', product);
} catch (error: any) {
  console.error('Error retrieving product:', error.message);
}

export default repo

const allProducts = repo.getAllProducts();
console.log('All products:', allProducts);
