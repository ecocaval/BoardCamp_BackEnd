//* Configs
import { db } from "../../config/database.connection.js";

export async function getCustomers(_, res) {
    try {
        const customers = await db.query("SELECT * FROM customers")
        return res.send(customers.rows)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)  
    }
}

export async function registerCostumer(req, res) {
    const { name, phone, cpf, birthday } = structuredClone(req.sanitizedBody)
    try {
        await db.query(
            "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
            [name, phone, cpf, birthday]
        )
        return res.sendStatus(201)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}