// ? Controller is all the logic to work with our data and return it back.

// ? Importing my movies
import data from "../db/data/recipes.js"

// ? Getting all movies, sending the response back.
function index(req, res) {
  res.send(data)
}

// ? Exports an object with index inside it.
export default {
  index
}