//* Configs
import { db } from "../../config/database.connection.js"

export async function validateCustomerId(req, res, next) {

    const { customerId } = structuredClone(req.sanitizedBody)

    try {
        const customers = await db.query('SELECT * FROM customers WHERE id = $1', [customerId])

        if (customers.rowCount === 0) return res.sendStatus(400)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    next()
}