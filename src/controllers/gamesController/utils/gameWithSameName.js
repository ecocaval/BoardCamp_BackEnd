import { db } from "../../../config/database.connection.js"

export async function gameWithSameName(gameRequest) {
    return await db.query("SELECT * FROM games WHERE name = $1", [gameRequest.name])
}