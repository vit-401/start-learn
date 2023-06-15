import express from "express";
import UserRepository from "./repository/userRepository";
import ProductRepository from "./repository/productRepository";
import {ProductModel} from "./schemas/product-model";
import {ProductService} from "./service/productService";
import UserService from "./service/userService";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import useragent from "express-useragent";
import {rateLimiterMiddleware} from "./middleware/rateLimiterMiddleware";
import {authRouter} from "./routes/authRouter";
import {authMiddleware} from "./middleware/authMiddleware";
import productsRoute from "./routes/protuctRouter";
import {emailRouter} from "./routes/emailRouter";
import {userRouter} from "./routes/userRouter";

const bodyParser = require('body-parser')

export const app = express()
const userRepository = new UserRepository()
const productRepository = new ProductRepository(ProductModel)
const productService = new ProductService(productRepository)
const userService = new UserService(userRepository)


app.use(cors({origin: '*'}))
app.use(errorHandler);
app.use(useragent.express());

app.use(bodyParser.json());
app.use(rateLimiterMiddleware)
app.use('/auth', authRouter(userService))
app.use('/users', userRouter(userService))
app.use('/products',authMiddleware,  productsRoute(productService))
app.use('/email', authMiddleware, emailRouter)


// Error handler middleware
app.use(errorHandler);