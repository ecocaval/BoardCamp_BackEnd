//* Libraries
import Joi from '@hapi/joi'

export const registerCustomerSchema = Joi.object({
    name: Joi.string().trim().allow("").alphanum().required(),
    phone: Joi.string().trim().min(8).max(12).alphanum().required(),
    cpf: Joi.string().length(11).alphanum().required(),
    birthday: Joi.string().required(),
})
