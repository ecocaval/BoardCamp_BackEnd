//* Libraries
import Joi from '@hapi/joi'

export const registerRentalSchema = Joi.object({
    customerId: Joi.number().required(),
    gameId: Joi.number().required(),
    daysRented: Joi.number().positive().integer().required(),
})