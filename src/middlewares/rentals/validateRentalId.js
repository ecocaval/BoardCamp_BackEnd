//* Configs
import { db } from "../../config/database.connection.js"

export async function validateRentalId(req, res, next) {

    const { id } = structuredClone(req.params)

    const rental = await db.query('SELECT * FROM rentals WHERE id = $1', [id])

    if (!rental.rowCount) return res.sendStatus(404)

    req.rental = rental

    next()
}