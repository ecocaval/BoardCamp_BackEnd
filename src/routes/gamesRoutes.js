//* Libraries
import { Router } from "express";

//* Controllers
import { getGames } from "../controllers/gamesController.js";

//* Middlewares
import { validateSchema } from "../middlewares/validateSchema.js";

//* Schemas 
import { gameSchema } from "../schemas/gameSchema.js";

const gamesRouter = Router()

//! Verify need to insert validate token below
gamesRouter.get('/games', getGames)

export default gamesRouter