import { db } from "../../../config/database.connection.js";

export async function getGamePricePerDayById(gameId) {
    try {
        const gamePrice = await db.query('SELECT * FROM games WHERE id = $1', [gameId])
        return gamePrice.rows[0].pricePerDay

    } catch (err) {
        console.log(err)
        return null
    }
}