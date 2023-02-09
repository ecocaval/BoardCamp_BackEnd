//* Libraries
import Joi from '@hapi/joi'

export const registerRentSchema = Joi.object({
    customerId: Joi.number().required(),
    gameId: Joi.number().required(),
    daysRented: Joi.number().required(),
})