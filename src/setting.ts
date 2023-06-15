import express from "express";
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


app.use(cors({origin: '*'}))
app.use(errorHandler);
app.use(useragent.express());

app.use(bodyParser.json());
app.use(rateLimiterMiddleware)
app.use('/auth', authRouter())
app.use('/users', userRouter())
app.use('/products',authMiddleware,  productsRoute())
app.use('/email', authMiddleware, emailRouter)


// Error handler middleware
app.use(errorHandler);