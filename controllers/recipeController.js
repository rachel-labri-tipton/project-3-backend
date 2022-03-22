// import Recipe from "../models.recipe.js"


async function index(req, res) {
    try {
        const recipes = await Recipe.find()
        res.send(recipes)
    } catch (e) {
        res.send({ message: "There was a problem finding your recipes." })
    }
}

async function show(req, res, next) {
    try {
        const id = req.params.id
        const recipe = await Recipe.findOne({ _id: id })
        if (!recipe) return res.json({ message: "Recipe not found." })

        res.status(200).json(book)
    } catch (err) {
        next(err)
    }

}

async function create(req, res, next) {
    const newRecipe = req.body
    try {
        const recipeFound = await Recipe.findOne({ title: newRecipe.title })
        if (recipeFound) {
            return res
                .status(400)
                .json({ message: `This recipe, ${newRecipe.title}, already exists` })
        }
        const createdRecipe = await Recipe.create(newRecipe)
        console.log(createdRecipe)
        res.status(201).json(createdRecipe)
    } catch (err) {
        next(err)
    }
}

async function remove(req, res, next) {
 
    const id = req.params.id
    try {
        const recipeToDelete = await Recipe.findOneAndDelete({ _id: id })
        if (!recipeToDelete) {
            return res.json({ message: "Recipe to delete not found." })
        }
        if (currentUser.role !== "admin") {
            return res.status(401).json({ message: "You have to be an admin to delete this recipe." })

        }
       recipeToDelete.remove()
        res.sendStatus(204)

    } catch (err) {
        next(err)
    }

}




export default {
    index, 
    show,
    create,
    remove
}