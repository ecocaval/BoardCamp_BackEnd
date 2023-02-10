//* Configs
import { db } from "../../config/database.connection.js";
import { getAddaptedQuery } from "../utils/getAddaptedQuery.js";

export async function getGames(req, res) {    
    const { name, order, desc, offset, limit } = structuredClone(req.query)

    let query = "SELECT * FROM games"
    let parameters = []

    query = getAddaptedQuery(
        "games", { name },
        order, desc,
        offset, limit,
        query, parameters
    )

    try {
        const games = await db.query(query, parameters)
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