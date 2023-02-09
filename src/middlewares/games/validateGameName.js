//* Configs
import { db } from "../../config/database.connection.js"

export async function validateGameName(req, res, next) {

    const gameRequest = structuredClone(req.sanitizedBody)

    try {
        const games = await db.query("SELECT * FROM games WHERE name = $1", [gameRequest.name])

        if (games.rowCount > 0) return res.sendStatus(409)

    } catch (err) {
        return res.sendStatus(500)
    }

    next()
}