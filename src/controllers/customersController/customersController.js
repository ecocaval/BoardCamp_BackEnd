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