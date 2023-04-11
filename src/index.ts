import express from 'express'
import productsRoute from "./routes/protucts";
import addressesRouter from "./routes/addresses";
import runDB from "./db";
import errorHandler from "./middleware/errorHandler";

const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json());
app.use('/products', productsRoute)
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
