import initiate from "./app.js"
import dotenv from 'dotenv'

dotenv.config({path: 'config.env'})


const db_uri = process.env.DB_URI
const port = process.env.PORT

initiate(db_uri, port)