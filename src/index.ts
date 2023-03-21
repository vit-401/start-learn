import express from 'express'

const app = express()


const port = process.env.PORT || 5001


const startApp = async () => {

  app.listen(port, () => {
    console.log(`App started: ${port}`)
  })
}

startApp()
