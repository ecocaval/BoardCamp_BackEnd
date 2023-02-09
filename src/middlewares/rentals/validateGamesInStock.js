//* Configs
import { db } from "../../config/database.connection.js"

export async function validateGamesInStock(req, res, next) {
    
    const { gameId } = structuredClone(req.sanitizedBody)
    
    try {
        const game = await db.query('SELECT * FROM games WHERE id = $1', [gameId])

        const { stockTotal } = game.rows[0]

        const gameRentals = await db.query('SELECT * FROM rentals WHERE "gameId" = $1', [gameId])

        const numberOfGamesRented = gameRentals.rows.length

        if (numberOfGamesRented >= stockTotal) return res.sendStatus(400)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    next()
}