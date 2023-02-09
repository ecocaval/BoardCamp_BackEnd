//* Libraries
import { Router } from "express";

//* Controllers
import { getRentals } from "../controllers/rentalsController/rentalsController.js";

const rentalsRouter = Router()

rentalsRouter.get('/rentals', getRentals)

export default rentalsRouter