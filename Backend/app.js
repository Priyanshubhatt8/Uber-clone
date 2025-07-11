const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const express = require('express')
const app = express()
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const cookieParser = require('cookie-parser')
connectToDb()
app.use(express.json())
app.use(express.urlencoded({extended:true})
)
app.use(cookieParser())
app.use(cors());


app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use('/users',userRoutes)
app.use('/captains',captainRoutes)
module.exports =app