import {Product} from "../models/product";
import {ObjectId} from "mongodb";
import {ProductModel} from "../schemas/product-model";
import {injectable} from "inversify";

@injectable()
export default class ProductRepository {
  // Create a new product and add it to the repository
  async createProduct(product: Product): Promise<Product> {
    const existingProduct = await ProductModel.find({title: product.title});
    if (existingProduct.length) {
      throw new Error('Product already exists');
    }

    const result = await ProductModel.insertMany([product], {lean: true})
    return result[0];
  }

  // Update an existing product in the repository
  async updateProduct(id: string, productUpdates: Partial<Product>): Promise<Product> {
    const objectId = new ObjectId(id);
    const result = await ProductModel.findOneAndUpdate(
      {_id: objectId},
      {$set: productUpdates},
      {lean: true}
    );

    if (!result) {
      throw new Error('Product not found');
    }

    return await this.getProductById(id);
  }

  // Delete an existing product from the repository
  async deleteProduct(id: string): Promise<Product[]> {
    const objectId = new ObjectId(id);
    const result = await ProductModel.deleteOne({_id: objectId});

    if (result.deletedCount === 0) {
      throw new Error('Product not found');
    }

    const products = await ProductModel.find()
    return products;
  }

  // Delete an existing product from the repository
  async deleteAllProduct(): Promise<Product[]> {

    const result = await ProductModel.deleteMany({});

    if (result.deletedCount === 0) {
      throw new Error('Product not found');
    }

    const products = await ProductModel.find();
    return products;
  }

  // Get a product by its ID from the repository
  async getProductById(id: string): Promise<Product> {
    const objectId = new ObjectId(id);
    const product = await ProductModel.findOne({_id: objectId});
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  // Get all products from the repository
  async getAllProducts(search?: string, limit?: string, page?: string, sort?: string): Promise<Product[]> {
    let query: any = {};
    if (search) {
      query['title'] = {$regex: new RegExp(search, 'i')};
    }
    const perPage = limit ? parseInt(limit) : 10; // number of results per page, default 10
    const currentPage = page ? parseInt(page) : 1; // current page number, default 1
    const skip = (currentPage - 1) * perPage; // calculate number of results to skip
    const sortOrder = sort === 'desc' ? -1 : 1; // determine sort order, default ascending

    const products = await ProductModel.find(query)
      .skip(skip)
      .limit(perPage)
      .sort({title: sortOrder, price: sortOrder})
    return products;
  }

}



