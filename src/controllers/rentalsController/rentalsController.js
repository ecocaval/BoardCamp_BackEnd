//* Configs
import dayjs from "dayjs";
import { db } from "../../config/database.connection.js";
import { getGamePricePerDayById } from "../gamesController/utils/getGamePricePerDayById.js";

export async function getRentals(_, res) {
    try {
        const rentals = await db.query("SELECT * FROM rentals") //! Do join after

        return res.send(rentals.rows)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function registerRental(req, res) {
    const { customerId, gameId, daysRented } = structuredClone(req.sanitizedBody)
    const rentDate = dayjs(Date.now()).format('DD/MM/YYYY')
    const gamePricePerDay = await getGamePricePerDayById(gameId)
    const originalPrice = gamePricePerDay * daysRented

    try {
        await db.query(
            'INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice") VALUES ($1, $2, $3, $4, $5)',
            [customerId, gameId, daysRented, rentDate, originalPrice])
        return res.sendStatus(201)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}