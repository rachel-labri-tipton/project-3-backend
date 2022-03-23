import { PORT } from "./config/environment.js"
import router from "./views/router.js"
import express from "express"
import { connectToDb } from "./db/helpers.js"
import logger from "./middleware/logger.js"
import errorHandler from "./middleware/errorHandler.js"
// ? Setting up express ready to use

async function startServer() {

    const app = express()

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

