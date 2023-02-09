//* Utils
import { sanitizeBody } from "../utils/sanitizeBody.js"

export function validateSchema(schema) {
    return (req, res, next) => {

        req.sanitizedBody = sanitizeBody(structuredClone(req.body))

        const { error } = schema.validate(req.sanitizedBody, { abortEarly: false })

        if (error) {
            const errorMessage = error.details.map(err => err.message).join(", ")
            return res.status(422).json({ message: errorMessage })
        }

        next()
    }
}