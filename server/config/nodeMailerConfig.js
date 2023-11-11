const nodeMailer =require('nodemailer')
const transporter=nodeMailer.createTransport({
    service:'Gmail',
    auth:{
        user:'studynodemailer@gmail.com',
        pass:'rxarhckuccykjsyr'
    }
})

module.exports=transporter