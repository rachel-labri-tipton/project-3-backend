import dotenv from "dotenv"
// ? Exporting my port number so I can use it in different places.
// ? Uppercase is nice convention for constants used by your whole app.
export const PORT = 4000


dotenv.config()

export const mongoConnect =
    process.env.MONGO_CONNECT || "mongodb://localhost/recipes"
export const port = process.env.PORT || 4000
export const secret = process.env.SECRET || "shhhh its a secret"
