//* Libraries
import Joi from '@hapi/joi'

export const registerGameSchema = Joi.object({
    name: Joi.string().trim().required(),
    image: Joi.string().trim().uri().required(),
    stockTotal: Joi.number().required(),
    pricePerDay: Joi.number().required(),
})