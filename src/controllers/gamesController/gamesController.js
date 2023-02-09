import { db } from "../../config/database.connection.js";
import { gameWithSameName } from "./utils/gameWithSameName.js";

export async function getGames(req, res) {
    try {
        const games = await db.query("SELECT * FROM games")

        return res.send(games.rows)

    } catch (err) {
        console.log(err)
        return res.send(500)
    }
}

export async function registerGame(req, res) {

    const gameRequest = structuredClone(req.sanitizedBody)

    try {
        const repeatedGame = await gameWithSameName(gameRequest)

        if (repeatedGame.rowCount > 0) return res.send(409)

        const { name, image, stockTotal, pricePerDay } = gameRequest

        await db.query(
            'INSERT INTO games ("name", "image", "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)',
            [name, image, stockTotal, pricePerDay]
        )
        return res.sendStatus(201)
        
    } catch (err) {
        console.log(err)
        return res.send(500)
    }
}