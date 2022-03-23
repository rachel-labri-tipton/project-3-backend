import express from "express"
// ? Import all my controllers
import recipeController from "../controllers/recipeController.js"


// ? This is a nice router object express gives you. Syntactic sugar
// ? to set up routes.
const router = express.Router()

//Routes for recipeController
router.get("/", (req, res) => {
    res.status(200).send("API Running")
})

router.route("/recipes")
    .get(recipeController.index)
    .post(recipeController.create)

router.route("/recipes/:id")
    .get(recipeController.show)
    .delete(recipeController.remove)
    .put(recipeController.update)

router.route("/recipes/recipe-type/:recipeType")
     .get(recipeController.showType)

router.route("/recipes/:id/review")



// ? Finally export my router.
// ! Make sure its lower case
export default router