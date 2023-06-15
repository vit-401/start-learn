import ProductRepository from "../repository/productRepository";
import {ProductService} from "../service/productService";
import {ProductController} from "../controllers/products-controller";

const productRepository = new ProductRepository();
const poductService = new ProductService(productRepository);
export const productController = new ProductController(poductService);