import { PORT } from "./config/environment.js"
import router from "./views/router.js"
import express from "express"
import { connectToDb } from "./db/helpers.js"
import logger from "./middleware/logger.js"
import errorHandler from "./middleware/errorHandler.js"
import cors from "cors"
import dotenv from "dotenv"

// ? Setting up express ready to use

async function startServer() {

    const app = express()

    dotenv.config()

    const PORT = process.env.PORT ? process.env.PORT : 4000

    app.use(cors())

    // ! Tell express it's a JSON API
    app.use(express.json())

    // ? Tell express about our router
    app.use(logger)

    app.use(router)

    app.use(errorHandler)

    await connectToDb()
    // ? Listen on a port
    app.listen(PORT, () => console.log(`Express server running on port ${PORT}`))

}

startServer()
