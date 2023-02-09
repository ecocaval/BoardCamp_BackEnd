//* Libraries
import express from "express"
import cors from "cors"

//* Routes
import gamesRouter from "./routes/gamesRoutes.js"

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())

app.use(gamesRouter)

app.listen(PORT, () => {
    console.log('listening to port ' + PORT)
})