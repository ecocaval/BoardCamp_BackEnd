//* Libraries
import { Router } from "express";

//* Controllers
import { finalizeRental, getRentals, registerRental } from "../controllers/rentalsController/rentalsController.js";

//* Middlewares
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateCustomerId } from "../middlewares/customers/validateCustomerId.js";
import { validateGameId } from "../middlewares/games/validateGameId.js";
import { validateDaysRented } from "../middlewares/rentals/validateDaysRented.js";
import { validateGamesInStock } from "../middlewares/games/validateGamesInStock.js";
import { validateRentalId } from "../middlewares/rentals/validateRentalId.js";
import { validateRentalIsFinalized } from "../middlewares/rentals/validateRentalIsFinalized.js";

//* Schemas
import { registerRentalSchema } from "../schemas/registerRentalSchema.js";

const rentalsRouter = Router()

rentalsRouter.get('/rentals', getRentals)

rentalsRouter.post(
    '/rentals',
    validateSchema(registerRentalSchema),
    validateCustomerId,
    validateGameId,
    validateDaysRented,
    validateGamesInStock,
    registerRental
)

rentalsRouter.post('/rentals/:id/return', validateRentalId, validateRentalIsFinalized, finalizeRental)

export default rentalsRouter