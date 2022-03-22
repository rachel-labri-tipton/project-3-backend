
import express from "express"
// ? Import all my controllers
import movieController from "../controllers/dataController.js"

// ? This is a nice router object express gives you. Syntactic sugar
// ? to set up routes.
const router = express.Router()

// ? Routes/Views: This is like app.get
router.route("/movies")
  .get(movieController.index)
  .post(() => console.log("TODO: post a movie"))

router.route("/movie/:id")
  .get(() => console.log("TODO: get a single movie"))
  .delete(() => console.log("TODO: delete a movie"))
  .put(() => console.log("TODO: update a movie"))

// ? Finally export my router.
// ! Make sure its lower case
export default router