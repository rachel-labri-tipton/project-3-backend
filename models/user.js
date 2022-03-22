
import mongoose from "mongoose"

// ? This tells mongoose what a movie looks like.
const userSchema = new mongoose.Schema({
  // ? Inside here live our fields
  userName: { type: String, required: true, maxLength: 30, unique: true },
  eMail: { type: String, required: true, unique: true, maxLength: 50 },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
})

// * Registering your schema with mongoose as a model.
// * It uses the first argument ('Movie') as a unique reference.
export default mongoose.model("User", userSchema)