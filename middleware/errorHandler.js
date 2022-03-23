function errorHandler(err, req, res, next) {
    if (err.name === "CastError") {
        return res.status(200).json({ message: "This is not a valid recipe." })
    }
    console.log("There was an error")
    console.log("The error is", err)

    if (err.name === "JsonWebTokenError") {
        return res.status(400).json({ message: "Could not verify JWT." })
    }
    console.log("There was an error")
    console.log("The error is", err)

    if (err.name === "TypeError") {
        return res.status(400).json({ message: "Hmmm...there might be a TypeError. Check if you entered the necessary information correctly." })
    }
    console.log("There was an error")
    console.log("The error is", err)
    // ! Default error, if we aren't more specific
    // ! 500 means something went wrong internally on the server.
    res.status(500).json({ message: "Did you check if the server's running?" })
}
export default errorHandler