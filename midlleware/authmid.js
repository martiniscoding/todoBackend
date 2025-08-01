const jwt = require("jsonwebtoken")
async function authMid(req,res,next){
    const token = req.cookies.token 
    let  decoded = jwt.verify(token, "key")
    if(!decoded){
        return res.status(400).json({
            msg:"You are not authorized"
        })
    }
    req.user= decoded
    next()

}

module.exports={
    authMid
}