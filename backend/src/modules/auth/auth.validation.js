import Joi from "joi";
export const signupSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^[A-Za-z\d]{5,32}$/))
    }).required()
}
export const loginSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^[A-Za-z\d]{5,32}$/))
    }).required()
}