//* Libraries
import Joi from '@hapi/joi'

export const updateCustomerSchema = Joi.object({
    name: Joi.string().trim().invalid(""),
    phone: Joi.string().trim().alphanum(),
    cpf: Joi.string().pattern(/^[0-9]{11}$/),
    birthday: Joi.string().pattern(/^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/),
})
