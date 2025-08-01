const {Todo, User}= require("../schemas/todoschema")
const mongoose= require("mongoose")
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');



async function createTodo(req,res){
    const total = await Todo.find({
        userId: req.user.id
    })
    const nextid= total.length+1
    const title= req.body.title
    const result = await Todo.create({
        id: nextid,
        title: title,
        userId: req.user.id,
        by:req.user.username
    })
    if(!result){
        return res.status(400).json({
        msg: "failed"
    })
    }
     res.status(200).json({
       success: true,
        todo: result
    })

}

async function seetodo(req,res){
    const ans = await Todo.find({
        userId:req.user.id
    })
    res.json({
        ans
    })
}
async function updateTodo(req,res){
    const id= req.params.id
    const done = req.body.done
    const result = await Todo.updateOne(
        {
            id: id
        }
        , {
            done: done
        },{
            new: true
        }
    )
    res.status(200).json({
        success: true,
        newtodo:result
    })

}
 async function deleteAll(req,res){
    const ans = await Todo.deleteMany()
    res.status(200).json({
        msg:"deleted eveything"
    })

 }



async function signup(req,res){
   try{
    const email= req.body.email
    const username= req.body.username
    const password = req.body.password
     
    if(!username || !email || !password){
        return res.status(400).json({
            success: false,
            msg:"Enter all the fields"
        })

    }
    const ans = await User.findOne({
        email:email
    })
    if(ans){
        return res.status(400).json({
            success:false,
            msg:"You are already registered"
        })
    }
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(password, salt);
    const userCount = await User.find()
    const userNumbers= userCount.length
     const insertintoDB= await User.create({
        id: userNumbers+1,
        username:username,
        email:email,
        password:hash
     })
     if(insertintoDB){
        res.status(200).json({
            msg:`account created welcome ${insertintoDB.username}`,
            
        })
     }
   }
   catch(e){
    res.json({
        success: true,
        msg:e.message
    })
   }
}
async function Login(req,res){
   try{
   
    const username= req.body.username
    const password = req.body.password
     
    if(!username || !password){
        return res.status(400).json({
            success: false,
            msg:"Enter all the fields"
        })

    }
    const ans = await User.findOne({
        username:username
    })
    if(!ans){
        return res.status(400).json({
            success:false,
            msg:"You need to first register"
        })
    }
    const checkpass= bcrypt.compareSync(password, ans.password);
    if(!checkpass){
        return res.status(400).json({
            success: false,
            msg:"Wrong password"
        })
    }
    var token = jwt.sign({ 
        id: ans._id,
        email:ans.email,
        username: ans.username
     }, "key", { expiresIn:"24h" });
     res.status(200).cookie("token" , token , { maxAge: 24*60*60*1000 }).json({
        success: true,
        msg:`welcome back ${ans.username}`
     })

   }
   catch(e){
    res.json({
        msg:e.message
    })
   }
}

async function getusers(req,res){
    const ans = await User.find().select("username id -_id ")
    res.status(200).json({
        success:true,
        ans 
    })


}
async function Logout(req,res){
    res.cookie("token", "hh", {maxAge:0}).json({
        success: true 
    })
}

async function profile(req,res){
    try{
        const ans = await User.findOne({
            _id: req.user.id
        })
        res.status(200).json({
            success: true ,
            ans

        })
    }
    catch(e){
        res.send(e.message)
    }
}


module.exports={
    createTodo,
    seetodo,
    updateTodo,
    deleteAll,
    signup,
    Login,
    getusers,
    Logout,
    profile
}