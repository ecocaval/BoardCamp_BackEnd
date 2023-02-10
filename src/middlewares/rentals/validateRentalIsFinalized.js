//* Configs
import { db } from "../../config/database.connection.js";

export async function validateRentalIsFinalized(req, res, next) {

    const { id } = structuredClone(req.params)

    const { returnDate } = req.rental.rows[0]

    if(!returnDate) return res.sendStatus(400)

    next()
}