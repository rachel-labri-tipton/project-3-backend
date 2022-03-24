import mongoose from "mongoose"

// ? Function to connect to the db

export function connectToDb() {

    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    const connectionString = process.env.MONGO_CONNECT ? process.env.MONGO_CONNECT : "mongodb://127.0.0.1:27017/recipes"
    return mongoose.connect(connectionString, opts)
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