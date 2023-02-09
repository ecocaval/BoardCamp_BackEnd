//* Configs
import dayjs from "dayjs";
import { db } from "../../config/database.connection.js";
import { getGamePricePerDayById } from "../gamesController/utils/getGamePricePerDayById.js";

export async function getRentals(_, res) {
    try {
        const rentals = await db.query(`
                SELECT

                rentals.id,
                rentals."customerId",
                rentals."gameId",
                rentals."rentDate",
                rentals."daysRented",
                rentals."returnDate",
                rentals."originalPrice",
                
                rentals."delayFee",
                json_build_object(
                    'id', customers.id,
                    'name', customers."name"
                ) AS customer,
                json_build_object(
                    'id', games.id,
                    'name', games."name"
                ) AS game
                
                FROM rentals
                INNER JOIN customers ON rentals."customerId" = customers.id
                INNER JOIN games ON rentals."gameId" = games.id;
            `)

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