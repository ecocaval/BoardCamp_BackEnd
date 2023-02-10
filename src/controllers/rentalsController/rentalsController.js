//* Configs
import dayjs from "dayjs";
import { db } from "../../config/database.connection.js";
import { getGamePricePerDayById } from "../gamesController/utils/getGamePricePerDayById.js";
import { getAddaptedQuery } from "../utils/getAddaptedQuery.js";
import { calculateDaysDiff } from "./utils/calculateDaysDiff..js";
import { getRentalsQuery } from "./utils/queries/getRentalsQuery.js";

export async function getRentals(req, res) {
    const { customerId, order, desc, offset, limit } = structuredClone(req.query)

    let query = getRentalsQuery
    let parameters = []

    query = getAddaptedQuery(
        "rentals", { customerId },
        order, desc,
        offset, limit,
        query, parameters
    )

    try {
        const rentals = await db.query(query, parameters)
        return res.send(rentals.rows)
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function registerRental(req, res) {
    const { customerId, gameId, daysRented } = structuredClone(req.sanitizedBody)
    const rentDate = dayjs(Date.now()).format('YYYY-MM-DD')
    const gamePricePerDay = await getGamePricePerDayById(gameId)
    const originalPrice = gamePricePerDay * daysRented

    try {
        await db.query(
            `INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice") 
            VALUES ($1, $2, $3, $4, $5)`,
            [customerId, gameId, daysRented, rentDate, originalPrice])
        return res.sendStatus(201)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function finalizeRental(req, res) {

    const { id } = structuredClone(req.params)

    try {
        const returnDate = new Date(Date.now())

        const { rentDate, daysRented, gameId } = req.rental.rows[0]

        const pricePerDay = await getGamePricePerDayById(gameId)

        let daysDiff = calculateDaysDiff(rentDate, daysRented, returnDate)

        const delayFee = pricePerDay * daysDiff

        await db.query(
            `UPDATE rentals SET "delayFee" = $1, "returnDate" = $2 
            WHERE id = $3`,
            [delayFee, returnDate, id]
        )
        return res.sendStatus(200)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function deleteRental(req, res) {

    const { id } = structuredClone(req.params)

    try {
        await db.query('DELETE FROM rentals WHERE id = $1', [id])
        return res.sendStatus(200)

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}