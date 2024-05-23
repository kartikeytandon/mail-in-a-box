const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv')

const User = require("./routes/user")

const app = express()
dotenv.config()

const PORT = process.env.PORT
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }
}

mongoose.connection.on('disconnected', () => {
    console.log("MongoDB Disconnected");
})
 
mongoose.connection.on('connected', () => {
    console.log("MongoDB Connected");
})

app.use(express.json())

app.use('/api/v1', User)

app.listen(PORT, () => {
    connect()
    console.log(`Server is running at ${PORT}`)
})