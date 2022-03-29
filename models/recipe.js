import mongoose from "mongoose"


const reviewSchema = new mongoose.Schema({
    // ? Inside here live our fields
    text: String,
    rating: Number,
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    createAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
})

// ? This tells mongoose what a movie looks like
const recipeSchema = new mongoose.Schema({
    // ? Inside here live our fields
    recipeName: { type: String, required: true, unique: true },
    author: String,
    type: { type: String, required: true, enum: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Detox"] },
    prepTime: { type: String, required: true },
    cookTime: { type: String, required: false },
    nutrition: String,
    vegan: Boolean,
    vegeterian: Boolean,
    glutenFree: Boolean,
    recipeIngredients: { type: Array, required: true },
    recipeInstructions: { type: Array, required: true },
    image: { type: String, required: false },
    description: { type: String, required: true },
    serve: { type: Number, required: true},
    review: [reviewSchema],
})

export default mongoose.model('Recipe', recipeSchema)