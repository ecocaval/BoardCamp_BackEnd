//* Libraries
import Joi from '@hapi/joi'

export const registerCustomerSchema = Joi.object({
    name: Joi.string().trim().allow("").alphanum().required(),
    phone: Joi.string().trim().alphanum().required(),
    cpf: Joi.string().alphanum().required(),
    birthday: Joi.string().required(),
})
