import { connectToDb, disconnectDb, dropDatabase } from "./helpers.js"
import Recipe from "../models/model.js"
import recipeData from "../db/data/recipes.js"
import User from "../models/user.js"
import userData from "../db/data/users.js"

async function seed() {
    // connect to the db
    await connectToDb()

    // ! Clear out the database
    await dropDatabase()

    // seed the data
    const wines = await Recipe.create(recipeData)
    console.log(`${wines.length} wines have been created! 🍿`)
    const users = await User.create(userData)
    console.log(
        `Users ${users.map((user) => user.userName).join(", ")} have been created.`
      )


    // disconnect the db
    await disconnectDb()
    console.log('bye')

}

seed()