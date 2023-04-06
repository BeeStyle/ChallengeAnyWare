import axios from "axios";
import searchHistoryModel from "../../../../DB/model/searchHistory.model.js";
import { errorHandler } from '../../../utils/errorHandling.js';

export const addsearchHistory = errorHandler(async (req, res, next) => {
    const { mobilenumber } = req.body;
    const { data } = await axios.get(`https://api.apilayer.com/number_verification/validate?number=${mobilenumber}`, {
        headers: {
            apikey: "EdilIVlYi0eWaA4R2Nz45tv9Zvax6QOZ"
        }
    })
    await searchHistoryModel.create({ mobilenumber, SearchedBy: req.user.id })
    return res.status(200).json({ message: "Done", data })
})

export const getsearchHistorys = errorHandler(async (req, res, next) => {
    const searchHistorys = await searchHistoryModel.find({})
    return res.status(200).json({ message: "Done", searchHistorys })
})