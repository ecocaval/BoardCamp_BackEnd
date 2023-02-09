//* Libraries
import Joi from '@hapi/joi'

export const updateCustomerSchema = Joi.object({
    name: Joi.string().trim().allow("").alphanum(),
    phone: Joi.string().trim().alphanum(),
    cpf: Joi.string().alphanum(),
    birthday: Joi.string(),
})
