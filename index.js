const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors({
    origin: 'http://localhost:5173',
   credentials: true
}))
const cookieparser = require("cookie-parser")
app.use(cookieparser())
app.use(express.urlencoded())
const {connectDB}= require("./db/db")

const {router} = require("./router")

app.use("/api", router)

app.use(cors())
connectDB()



app.listen(3000, function(){
    console.log(`server started `);
    
})