//* Libraries
import Joi from '@hapi/joi'

export const registerCustomerSchema = Joi.object({
    name: Joi.string().trim().invalid("").required(),
    phone: Joi.string().trim().alphanum().min(10).max(11).required(),
    cpf: Joi.string().pattern(/^[0-9]{11}$/).required(),
    birthday: Joi.string().pattern(/^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/).required(),
})
