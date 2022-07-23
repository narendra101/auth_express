import express from 'express'
import connectDB from './db.js'
import userRoutes from './routes/UserRoutes.js'

const app = express()




// PING ROUTE
const pingRoute = (req, res) => {
    res.status(200).json('pong')
}

// NO URL MATCHED. 404 PAGE NOT FOUND
const error404 = (req, res) => {
    res.status(404).json('404 Page Not Found') 
}

app.use(express.json())
app.use('/ping', pingRoute)
app.use('/user', userRoutes)
app.use(error404)


const initiate = async (DB_URI, PORT) => {
    try {   
        await connectDB(DB_URI)
        await app.listen(PORT, () => console.log(`server started at ${PORT}`))
    } catch (error) {
        console.log(`error: ${error.message}`)
    }
}

export default initiate