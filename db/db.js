const mongoose = require("mongoose")
const mongUrl= process.env.MONG

async function connectDB(){
    try{

        const ans = await mongoose.connect(mongUrl)
        if(ans){
            console.log("connected to databse ")
        }
    }
    catch(e){
        console.log(e.message);
        
    }
}

module.exports={
    connectDB
}