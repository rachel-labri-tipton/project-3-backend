import { connectToDb, disconnectDb, dropDatabase } from "./helpers.js"
import Recipe from "../models/recipe.js"
import recipeData from "./data/recipeData.js"
import User from "../models/user.js"
import userData from "./data/userData.js"

async function seed() {
    // connect to the db
    await connectToDb()

    // ! Clear out the database
    await dropDatabase()

    // seed the data
    const recipes = await Recipe.create(recipeData)
    console.log(`${recipes.length} recipes have been created!`)
    const users = await User.create(userData)
    console.log(
        `Users ${users.map((user) => user.userName).join(", ")} have been created.`
      )


    // disconnect the db
    await disconnectDb()
    console.log('Disconnecting from database.')

}

seed()