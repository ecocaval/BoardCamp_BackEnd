//* Configs
import { db } from "../../config/database.connection.js"

export async function validateGameId(req, res, next) {

    const { gameId } = structuredClone(req.sanitizedBody)

    try {
        const games = await db.query('SELECT * FROM games WHERE id = $1', [gameId])

        if (games.rowCount === 0) return res.sendStatus(400)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    next()
}