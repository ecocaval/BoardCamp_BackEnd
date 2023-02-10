//* Configs
import { db } from "../../config/database.connection.js";

export async function getGames(req, res) {

    const { name } = structuredClone(req.query)

    try {
        if (name) {
            const games = await db.query("SELECT * FROM games WHERE name LIKE $1", [`${name}%`])
            return res.send(games.rows)
        }

        const games = await db.query("SELECT * FROM games")

        return res.send(games.rows)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
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
        return res.sendStatus(500)
    }
}