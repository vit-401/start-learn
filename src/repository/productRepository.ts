import {db} from "./db";
import {Collection, ObjectId} from "mongodb";

type Product = {
  _id?: ObjectId;
  title: string;
  price: number;
};
const productCollection: Collection<Product> = db.collection('videos')

class ProductRepository {
  private productCollection: Collection<Product>;

  constructor(productCollection: Collection<Product>) {
    this.productCollection = productCollection;
  }

  // Create a new product and add it to the repository
  async createProduct(product: Product): Promise<Product> {
    const existingProduct = await this.productCollection.findOne({title: product.title});
    if (existingProduct) {
      throw new Error('Product already exists');
    }

    const result = await this.productCollection.insertOne(product)
    const insertedProduct = await this.getProductById(result.insertedId.toString())
    // const newProduct = result.ops[0] as Product;
    return insertedProduct;
  }

  // Update an existing product in the repository
  async updateProduct(id: string, productUpdates: Partial<Product>): Promise<Product> {
    const objectId = new ObjectId(id);
    const result = await this.productCollection.findOneAndUpdate(
      {_id: objectId},
      {$set: productUpdates},
    );

    const updatedProduct = result.value;
    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    return await this.getProductById(id);
  }

  // Delete an existing product from the repository
  async deleteProduct(id: string): Promise<Product[]> {
    const objectId = new ObjectId(id);
    const result = await this.productCollection.deleteOne({_id: objectId});

    if (result.deletedCount === 0) {
      throw new Error('Product not found');
    }

    const products = await this.productCollection.find().toArray();
    return products;
  }

  // Delete an existing product from the repository
  async deleteAllProduct(): Promise<Product[]> {

    const result = await this.productCollection.deleteMany({});

    if (result.deletedCount === 0) {
      throw new Error('Product not found');
    }

    const products = await this.productCollection.find().toArray();
    return products;
  }

  // Get a product by its ID from the repository
  async getProductById(id: string): Promise<Product> {
    const objectId = new ObjectId(id);
    const product = await this.productCollection.findOne({_id: objectId});
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  // Get all products from the repository
  async getAllProducts(search?: string): Promise<Product[]> {
    let query = {};
    if (search) {
      query = {title: {$regex: new RegExp(search, 'i')}};
    }
    const products = await this.productCollection.find(query).toArray();
    return products;
  }
}

// Usage example:
// const products = productCollection.find({})
const repo = new ProductRepository(productCollection);
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
export default repo
//
// const allProducts = repo.getAllProducts();
// console.log('All products:', allProducts);
