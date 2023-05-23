const express = require("express")

require("dotenv").config({path:"./.env"})
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open",()=>{
    console.log("db connected");
    app.listen(PORT,console.log(`http://localhost:${PORT}`))
})

const app = express()

app.use(express.json()) //body parser
app.use("/api/user",require('./routes/userRoutes'))

const PORT = process.env.PORT || 5000 
