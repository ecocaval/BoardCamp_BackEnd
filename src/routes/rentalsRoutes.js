//* Libraries
import { Router } from "express";

//* Controllers
import { getRentals, registerRental } from "../controllers/rentalsController/rentalsController.js";

//* Middlewares
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateCustomerId } from "../middlewares/customers/validateCustomerId.js";
import { validateGameId } from "../middlewares/games/validateGameId.js";
import { validateDaysRented } from "../middlewares/rentals/validateDaysRented.js";

//* Schemas
import { registerRentalSchema } from "../schemas/registerRentalSchema.js";
import { validateGamesInStock } from "../middlewares/rentals/validateGamesInStock.js";

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

export default rentalsRouter