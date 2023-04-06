import Joi from "joi";
export const AddSchema = {
    body: Joi.object({
        mobilenumber: Joi.string().min(5).max(25).required(),
    }).required()
}
export const searchSchema = {
    body: Joi.object({
        search: Joi.string().required()
    }).required()
}