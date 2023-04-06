import userModel from "../../../../DB/model/User.model.js";
import { compare, hash } from "../../../utils/generateandcomparehash.js";
import { generateToken } from "../../../utils/generateandverifytoken.js";
import { errorHandler } from './../../../utils/errorHandling.js';

export const signup = errorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const checkUser = await userModel.findOne({ email })
    if (checkUser) {
        return next(new Error("Email exist"), { cause: 409 })
    }
    const hashpassword = hash({ plainText: password })
    const user = await userModel.create([{ email, password: hashpassword }])
    return res.status(201).json({ message: "Done", user })

})

export const login = errorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error("IN-valid Email", { cause: 404 }))
    }
    const match = compare({ plainText: password, hashValue: user.password })
    if (!match) {
        return next(new Error("Invalid password", { cause: 400 }))
    }
    const token = generateToken({
        payLoad: {
            id: user._id, email: user.email
        },
        signature: process.env.TOKENSIGNATURE,
        expiresIn: 60 * 60 * 24
    })
    user.isloggedin = true
    await user.save()
    return res.status(200).json({ message: "Done", token })
})

export const LogOut = errorHandler(async (req, res, next) => {
    await userModel.findByIdAndUpdate({ _id: req.user.id }, { isloggedin: false })
    return res.status(200).json({ message: "logged out successfully" })
})