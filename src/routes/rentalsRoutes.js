//* Libraries
import { Router } from "express";

//* Controllers
import { getRentals, registerRental } from "../controllers/rentalsController/rentalsController.js";

//* Middlewares
import { validateSchema } from "../middlewares/validateSchema.js";

//* Schemas
import { registerRentalSchema } from "../schemas/registerRentalSchema.js";

const rentalsRouter = Router()

rentalsRouter.get('/rentals', getRentals)

rentalsRouter.post('/rentals', validateSchema(registerRentalSchema), registerRental)

export default rentalsRouter