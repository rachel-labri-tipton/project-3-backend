
import Recipe from "../models/recipe.js"


async function index(req, res, next) {
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

        res.status(200).json(recipe)
    } catch (err) {
        next(err)
    }

}


async function create(req, res, next) {
    const newRecipe = req.body
    try {
        const recipeFound = await Recipe.findOne({ recipeName: newRecipe.recipeName })
        if (recipeFound) {
            return res
                .status(400)
                .json({ message: `This recipe, ${newRecipe.recipeName}, already exists` })
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
        // if (currentUser.role !== "admin") {
        //     return res.status(401).json({ message: "You have to be an admin to delete this recipe." })

        // }
       recipeToDelete.remove()
        res.sendStatus(204)

    } catch (err) {
        next(err)
    }

}




async function update(req, res, next) {
    const id = req.params.id
    const recipeToUpdate = req.body
    if (!recipeToUpdate) return res.json({ message: "Recipe not found." })
    // if (currentUser.role !== "admin") {
    //     return res.status(401).json({ message: "You must be an admin to update this recipe." })
    // }
    try {
        const updatedRecipe = await Recipe.findOneAndUpdate({ _id: id }, recipeToUpdate, { new: true })
        console.log(updatedRecipe)
        updatedRecipe.set(recipeToUpdate)
        await updatedRecipe.save()
        res.status(201).json(updatedRecipe)
    } catch (err) {
        next(err)
    }

}

async function showType(req, res, next) {
    try {
        const { recipeType } = req.params
        const recipes = await Recipe.find({ type: recipeType })
        if (!recipes) return res.json({ message: "We don't have this type of recipe." })
        res.status(200).json(recipes)
    }
    catch (err) {
        next(err)
    }
}





export default {
    index, 
    show,
    create,
    remove, 
    update, 
    showType
}