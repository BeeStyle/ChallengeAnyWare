import userModel from "../../../../DB/model/User.model.js"
import { errorHandler } from './../../../utils/errorHandling.js';

export const getUserModule = errorHandler(async (req, res, next) => {
    const users = await userModel.find({})
    return res.status(200).json({ message: "Done", users })
})