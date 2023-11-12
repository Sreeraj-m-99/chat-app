const express=require('express')
const router=express.Router()
const messageController=require('../contollers/messageController')
const verifyToken=require('../middleware/authMiddleware')

router.post('/',verifyToken,messageController.createMessage)

module.exports=router