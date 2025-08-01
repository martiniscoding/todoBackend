const mongoose= require("mongoose")

const todoSchema= mongoose. Schema({
    id:{
        type: String,
        required: true
    },
    title:{
        required: true,
        type: String
    },
    done:{
        type : Boolean,
        required: true,
        default: false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    by:{
        type:String
    }
}, {timestamps: true})




const userSchema= new mongoose.Schema({
    username : {
        required: true,
        type: String
    },
    email : {
        required: true,
        unique: true,
        type: String
    },
    password : {
        required: true,
        type: String
    },
    photoUrl:{
        type: String,
    }
   
} , {timestamps: true})

const User = mongoose.model("user", userSchema)



const Todo= mongoose.model("todo" ,todoSchema)

module.exports={
    Todo,
    User
}