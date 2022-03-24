import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

async function index(req, res) {
    try {
        const users = await User.find()
        res.send(users)
    } catch (e) {
        next(err)
    }
}

async function register(req, res, next) {
    try {
        const existingUser = await User.findOne({ eMail: req.body.eMail })
        console.log(existingUser)
        if (existingUser) {
            return res.status(400).json({ message: "This user already exists." })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = await User.create({ ...req.body, password: hashedPassword })
        res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
}

async function remove(req, res, next) {
    const id = req.params.id
    try {
        const deletedUser = await User.findOneAndDelete({ _id: id })
        if (!deletedUser) return res.json({ message: "deleted user not found" })
        console.log(deletedUser)
        if (deletedUser) return res.json({ message: ` ${deletedUser.userName} has been deleted` })
        res.sendStatus(204)

    } catch (err) {
        next(err)
    }
}

async function login(req, res, next) {
    try {
        const user = await User.findOne({ eMail: req.body.eMail })
        // console.log(user)
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials." })
        }
        console.log(user)
        const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
        if (!passwordsMatch) {
            return res.json({ message: "Wrong password" })
        }
        const payload = {
            eMail: user.eMail,
            role: user.role,
        }
        //don't put too much sensitive information in the payload that comes back
        //here we sign with a secret the given payload 
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        res.status(200).json({ token })
    } catch (err) {
        next(err)
    }

}

export default {
    index,
    register, 
    login, 
    remove
}

