require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors({
    origin: 'https://end-rho.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


const cookieparser = require("cookie-parser")
app.use(cookieparser())
app.use(express.urlencoded())
const {connectDB}= require("./db/db")

const {router} = require("./router")

app.use("/api", router)


connectDB()


const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log(`server started `);
    
})
