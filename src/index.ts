import express from 'express'
import productsRoute from "./routes/protucts";
import addressesRouter from "./routes/addresses";

const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json());
app.use('/products', productsRoute)
app.use('/addresses', addressesRouter)


const port = process.env.PORT || 5001


const startApp = async () => {


  app.listen(port, () => {
    console.log(`App started: ${port}`)
  })
}

startApp()
