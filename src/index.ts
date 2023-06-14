import runDB from "./db";
import {ObjectId} from "mongodb";
import {app} from "./setting";



declare global {
  namespace Express {
    export interface Request {
      userId?: ObjectId
    }
  }
}


const port = process.env.PORT || 5001


const startApp = async () => {


  app.listen(port, async () => {
    await runDB()
    console.log(`App started: ${port}`)
  })
}

startApp()
