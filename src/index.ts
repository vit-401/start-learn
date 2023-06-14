import express from 'express'
import productsRoute from "./routes/protuctRouter";
import runDB from "./db";
import errorHandler from "./middleware/errorHandler";
import {ProductService} from "./service/productService";
import {authRouter} from "./routes/authRouter";
import UserRepository from "./repository/userRepository";
import ProductRepository from "./repository/productRepository";
import UserService from "./service/userService";
import {authMiddleware} from "./middleware/authMiddleware";
import {ObjectId} from "mongodb";
import {emailRouter} from "./routes/emailRouter";
import useragent from "express-useragent";
import cors from "cors";
import {rateLimiterMiddleware} from "./middleware/rateLimiterMiddleware";
import {ProductModel} from "./schemas/product-model";


const bodyParser = require('body-parser')
const app = express()
const userRepository = new UserRepository()
const productRepository = new ProductRepository(ProductModel)

declare global {
  namespace Express {
    export interface Request {
      userId?: ObjectId
    }
  }
}

const productService = new ProductService(productRepository)
const userService = new UserService(userRepository)


app.use(cors({origin: '*'}))
app.use(errorHandler);
app.use(useragent.express());

app.use(bodyParser.json());
app.use(rateLimiterMiddleware)
app.use('/auth', authRouter(userService))
app.use('/products',authMiddleware,  productsRoute(productService))
app.use('/email', authMiddleware, emailRouter)


// Error handler middleware
app.use(errorHandler);

const port = process.env.PORT || 5001


const startApp = async () => {


  app.listen(port, async () => {
    await runDB()
    console.log(`App started: ${port}`)
  })
}

startApp()
