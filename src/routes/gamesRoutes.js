//* Libraries
import { Router } from "express";

//* Controllers
import { getGames, registerGame } from "../controllers/gamesController/gamesController.js";
import { validateGameBody } from "../middlewares/validateGameBody.js";
import { validateGameName } from "../middlewares/validateGameName.js";

//* Middlewares
import { validateSchema } from "../middlewares/validateSchema.js";

//* Schemas 
import { registerGameSchema } from "../schemas/registerGameSchema.js";

const gamesRouter = Router()

//! Verify need to insert validate token below
gamesRouter.get('/games', getGames)

gamesRouter.post('/games', validateSchema(registerGameSchema), validateGameName, validateGameBody, registerGame)

export default gamesRouter