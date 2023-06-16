import "reflect-metadata";
import UserRepository from "./repository/userRepository";
import UserService from "./service/userService";
import {UserController} from "./controllers/userController";
import {AuthController} from "./controllers/authController";
import {Container} from "inversify";
import {ProductService} from "./service/productService";
import ProductRepository from "./repository/productRepository";

// const

export const container = new Container();
// container.bind(AuthRepository).to(AuthRepository)
//
// container.bind(EmailService).to(EmailService)
//
container.bind(UserController).to(UserController)
container.bind(AuthController).to(AuthController)
container.bind(UserService).to(UserService)
container.bind(ProductService).to(ProductService)
container.bind(ProductRepository).to(ProductRepository)
container.bind(UserRepository).to(UserRepository)
// container.bind(ProductController).to(ProductController)
// container.bind(AuthController).to(AuthController)




