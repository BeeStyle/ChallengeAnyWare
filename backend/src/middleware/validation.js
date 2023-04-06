const dataMethods = ["body", "query", "params"]
const validation = (schema) => {
    return (req, res, next) => {
        const validationErr = []
        dataMethods.forEach(key => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], { abortEarly: false })
                if (validationResult.error) {
                    validationErr.push(validationResult.error.details)
                }
            }
        })
        if (validationErr.length > 0) {
            return next(new Error("validation Error"))
        }
        return next()
    }
}
export default validation