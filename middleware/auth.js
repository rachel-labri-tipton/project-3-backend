import jwt from "jsonwebtoken"
import User from "../models/user.js"

export default async function auth(req, res, next) {
    //Check the request or the token 
    const rawToken = req.headers.authorization
    if (!rawToken) {
        return res.status(401).json({ message: "Unauthorized - No token provided" })
    }

    try {
        const token = rawToken.split("Bearer ")[1].trim()
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)


        const user = await User.findOne({ eMail: decodedToken.eMail })
        //if you use find, you'll get empty array--empty array is a truthy value 
        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User doesn't exist" })
        }

        req.currentUser = user
        next()

    } catch (err) {
        next(err)
    }
}

