//* Configs
import { db } from "../../config/database.connection.js";

export async function getGames(req, res) {    
    const { name, order, desc, offset, limit } = structuredClone(req.query)

    let query = "SELECT * FROM games"
    let parameters = []

    if (name) {
        query += " WHERE name LIKE $1"
        parameters.push(`${name}%`)
    }

    if (order) {
        query += ` ORDER BY ${order} ${(desc ? ' DESC' : '')}`
    }

    if (offset) {
        query += " OFFSET $" + (parameters.length + 1)
        parameters.push(offset)
    }

    if (limit) {
        query += " LIMIT $" + (parameters.length + 1)
        parameters.push(limit)
    }

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