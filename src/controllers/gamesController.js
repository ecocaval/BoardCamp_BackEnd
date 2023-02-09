import { db } from "../config/database.connection.js";

export async function getGames(req, res) {    
    try {
        const games = await db.query("SELECT * FROM games")

        return res.send(games)
        
    } catch (err) {
        console.log(err)
        return res.send(500)
    }
}