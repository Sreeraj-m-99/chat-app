const express=require('express')
const router=express.Router()
const messageController=require('../contollers/messageController')

router.post('/',messageController.createMessage)

module.exports=router