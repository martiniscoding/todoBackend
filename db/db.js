const mongoose = require("mongoose")

async function connectDB(){
    try{

        const ans = await mongoose.connect("mongodb+srv://sk4251867:HpEPML1NwPcesx06@cluster0.wdfqfhh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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