import express from "express"
// ? Import all my controllers
import recipeController from "../controllers/recipeController.js"
import userController from "../controllers/userController.js"
import auth from "../middleware/auth.js"

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
    .get(auth,recipeController.show)
    .delete(auth,recipeController.remove)
    .put(auth,recipeController.update)

router.route("/recipes/recipe-type/:recipeType")
     .get(auth,recipeController.showType)


// This will use auth
router.route("/recipes/:id/review")

router.route("/users")
    .get(auth, userController.index)

router.route("/register")
    .post(userController.register)
  
router.route("/login")
    .post(userController.login)

// ? Finally export my router.
// ! Make sure its lower case
export default router