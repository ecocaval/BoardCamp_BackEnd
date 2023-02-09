//* Configs
import { db } from "../../config/database.connection.js";

export async function getGames(_, res) {
    try {
        const games = await db.query("SELECT * FROM games")

        return res.send(games.rows)

    } catch (err) {
        console.log(err)
        return res.send(500)
    }
}

export async function registerGame(req, res) {

    const { name, image, stockTotal, pricePerDay } = structuredClone(req.sanitizedBody)

    try {
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