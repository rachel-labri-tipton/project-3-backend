import Recipe from "../models/recipe.js"

async function index(req, res, next) {
  const { id } = req.params
  try {
    const recipeReview = await Recipe.findById(id)
    console.log(recipeReview)
    res.send(recipeReview.review)
  } catch (err) {
    next(err)
  }
}

async function create(req, res, next) {
    const { body: newReview } = req
    const { id: recipeId } = req.params
    newReview.user = req.currentUser._id
    newReview.createdBy = req.currentUser.userName
    try {
      const recipeToReview = await Recipe.findById(recipeId)
      recipeToReview.review.push(newReview)
      console.log({ newReview  })
      const updatedRecipe = await recipeToReview.save()
      return res.status(200).json(updatedRecipe)
    } catch (err) {
      next(err)
    }
  }


async function update(req, res, next) {
    const { id:recipeId, reviewId } = req.params

    try {
      const recipe = await Recipe.findById(recipeId)
  
      if (!recipe) {
        return res.status(404).send({ message: "Recipe not found" })
      }
  
      const review = recipe.review.id(reviewId)

      if (!review) {
        return res.status(404).send({ message: "Review not found" })
      }

      if (!req.currentUser._id.equals(review.user)) {
        return res
          .status(401)
          .send({ message: "Unauthorized - You didn't create that review" })
      }
  
      review.set(req.body)
      const updatedReview = await recipe.save()
      return res.status(200).json(updatedReview)
    } catch (e) {
      next(e)
    }
  }
  
  async function remove(req, res, next) {
    const { id: recipeId, reviewId } = req.params
  
    const recipe = await Recipe.findById(recipeId)
    if (!recipe) {
        return res.status(404).send({ message: "Recipe not found" })
      }

    const review = recipe.review.id(reviewId)
    if (!review) {
        return res.status(404).send({ message: "Review not found" })
      }
  
  
    if (!req.currentUser._id.equals(review.user)) {
    return res
        .status(401)
        .send({ message: "Unauthorized - You didn't create that review" })
    }
  
    review.remove()

    const updatedReview = await recipe.save()
  
    return res.status(200).send(updatedReview)
  }
  
  export default {
    index,
    create,
    update,
    remove,
  }