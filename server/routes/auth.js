const express=require('express')

const router=express.Router()

const authController=require('../contollers/authController')



// registration

router.post('/register',authController.register)


// login

router.post('/login',authController.login)

// forgotPassword

router.post('/forget-password',authController.forgotPassword)

// verify-otp
router.post('/verify-otp',authController.verifyOtp)

// change-password

router.post('/change-password',authController.changePassword)

module.exports=router