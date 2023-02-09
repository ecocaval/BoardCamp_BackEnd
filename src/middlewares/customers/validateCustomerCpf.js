//* Configs
import { db } from "../../config/database.connection.js"

export async function validateCustomerCpf(req, res, next) {

    const { cpf } = structuredClone(req.sanitizedBody)

    try {
        const customers = await db.query('SELECT * FROM customers WHERE cpf = $1', [cpf])

        if (customers.rowCount > 0) return res.sendStatus(409)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    next()
}