import mongoose from "mongoose"

// ? Function to connect to the db

export function connectToDb() {

    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    return mongoose.connect("mongodb://127.0.01:27017/recipes", opts)
}

export async function disconnectDb() {
    // ? This will check the database is ready to be disconnect
    if (mongoose.connection.readyState !== 0) {
        return mongoose.disconnect()
    }
}

// ! Added drop database
export async function dropDatabase() {
    mongoose.connection.db.dropDatabase()
  }