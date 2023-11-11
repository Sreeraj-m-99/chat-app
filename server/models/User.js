const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    resetPasswordToken: String,  // Add this field to store the reset token
  resetPasswordExpires: Date 
})

module.exports=mongoose.model('User',userSchema)