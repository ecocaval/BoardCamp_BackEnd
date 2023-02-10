//* Configs
import { db } from "../../config/database.connection.js";
import { buildCustomerQueries } from "./utils/buildCustomerQueries.js";

export async function getCustomers(req, res) {

    const { cpf, offset, limit } = structuredClone(req.query)

    let query = "SELECT * FROM customers"
    let parameters = []

    if (cpf) {
        query += ' WHERE cpf LIKE $1';
        parameters.push(`${cpf}`)
    }

    if (offset) {
        query += " OFFSET $" + (parameters.length + 1)
        parameters.push(offset)
    }

    if (limit) {
        query += " LIMIT $" + (parameters.length + 1)
        parameters.push(limit)
    }

    console.log(query);

    try {
        const customers = await db.query(query, parameters)
        return res.send(customers.rows)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function getCustomerById(req, res) {

    const { id } = structuredClone(req.params)

    try {
        const costumer = await db.query("SELECT * FROM customers WHERE id = $1 LIMIT 1", [id])

        if (costumer.rowCount === 0) return res.sendStatus(404)

        return res.send(costumer.rows[0])

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

export async function updateCustomerById(req, res) {

    const updateRequest = structuredClone(req.sanitizedBody)
    const { id } = structuredClone(req.params)

    const [queryArray, queryIndexString] = buildCustomerQueries(updateRequest)
    const idIndex = queryArray.length + 1

    try {
        await db.query(`UPDATE customers SET ${queryIndexString} WHERE id = $${String(idIndex)}`, [...queryArray, id])
        return res.sendStatus(200)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
    res.send()
}