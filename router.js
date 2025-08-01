const express = require("express")
const router= express.Router()
const {createTodo, getusers, seetodo, updateTodo, deleteAll, signup, Login, Logout, profile} = require("./controllers/createtodo")
const { authMid } = require("./midlleware/authmid")

router.post("/create" ,authMid, createTodo)
router.get("/" , authMid, seetodo)
router.put("/update/:id" , updateTodo)
router.delete("/delete", deleteAll)
router.post("/signup" , signup)
router.post("/login" , Login)
router.get("/seeusers" , authMid, getusers)
router.post("/logout" , Logout)
router.get("/profile" , authMid, profile)


module.exports={
    router
}