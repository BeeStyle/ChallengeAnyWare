import userModel from "../../DB/model/User.model.js"
import { decodeToken } from "../utils/generateandverifytoken.js"
import { errorHandler } from './../utils/errorHandling.js';
const auth = errorHandler(async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization?.startsWith(process.env.BEARERKEY)) {
        return next(new Error("Invalid bearer key"), { cause: 401 })
    }
    const token = authorization.split(process.env.BEARERKEY)[1]
    if (!token) {
        return next(new Error("Token Required"), { cause: 401 })
    }
    const decoded = decodeToken({ token, signature: process.env.TOKENSIGNATURE })
    if (!decoded.id) {
        return res.status(400).json({ message: "Invalid Token PayLoad" })
    }
    const authUser = await userModel.findById(decoded.id).select("email isloggedin")
    if (authUser.isloggedin == false) {
        return res.status(400).json({ message: "Please Login" })
    }
    if (!authUser) {
        return res.status(400).json({ message: "Not a Registered account" })
    }
    req.user = authUser
    return next()
})
export default auth