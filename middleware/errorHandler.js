function errorHandler(err, req, res, next) {
    if (err.name === "CastError") {
        return res.status(200).json({ message: "This is not a valid recipe." })
    }

    if (err.name === "JsonWebTokenError") {
        return res.status(400).json({ message: "Could not verify JWT." })
    }

    if (err.name === "TypeError") {
        return res.status(400).json({ message: "Hmmm...there might be a TypeError. Check if you entered the necessary information correctly." })
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({ message: `${err.message}` })
      }
    
    if (err.name === "NotFoundError") {
        return res.status(404).json({ message: `${err.message}` })
    }

    res.status(500).json({ message: "Did you check if the server's running?" })
}
export default errorHandler

