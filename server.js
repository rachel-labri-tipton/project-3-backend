import { PORT } from "./config/environment.js"
// ? Importing router
import router from "./views/router.js"

// ? Importing express
import express from "express"

// ? Setting up express ready to use
const app = express()

// ! Tell express it's a JSON API

app.use(express.json)

// ? Tell express about our router
app.use(router) 

// ? Listen on a port
app.listen(PORT, () => console.log("hello express"))