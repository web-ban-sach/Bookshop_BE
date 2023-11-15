import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import router from "./routes"
dotenv.config()
// Khởi tạo
const app = express()
// Middlewave
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/bookshop").then(() => console.log("Connect to DB successfully"))
// Router
app.use('', router)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
})


