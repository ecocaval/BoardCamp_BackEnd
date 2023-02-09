//* Configs
import { db } from "../../config/database.connection.js";

export async function getRentals(req, res) {
    try {
        const rentals = await db.query("SELECT * FROM rentals") //! Do join after

        return res.send(rentals.rows)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}