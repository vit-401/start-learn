import express from 'express'
import productsRoute from "./routes/protucts";
import addressesRouter from "./routes/addresses";
import runDB from "./db";
import errorHandler from "./middleware/errorHandler";
import {ProductService} from "./service/productService";
import {authRoutes} from "./routes/auth-routes";
import UserRepository from "./repository/user-repository";
import ProductRepository from "./repository/productRepository";
import UserService from "./service/user-service";
import {authMiddleware} from "./middleware/authMiddleware";
import {User} from "./models/user";
import {ObjectId} from "mongodb";

const bodyParser = require('body-parser')
const app = express()
const userRepository = new UserRepository()
const productRepository = new ProductRepository()

declare global {
  namespace Express {
    export interface Request {
      userId?: ObjectId
    }
  }
}

const productService = new ProductService(productRepository)
const userService = new UserService(userRepository)

app.use(bodyParser.json());
app.use('/auth', authRoutes(userService))
app.use('/products',authMiddleware, productsRoute(productService))
app.use('/addresses', addressesRouter)


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
