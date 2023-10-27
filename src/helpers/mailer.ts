import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
export const sendEmail = async({email,emailType,userId}:any)=>{
  try {
    //creating a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(),10)
    if(emailType == 'VERIFY'){
      await User.findOneAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000})
    }else if(emailType == 'RESET'){
      await User.findOneAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordExpiry:Date.now()+3600000})
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2f2c145143d33c",
        pass: "4d8a6c5fdf11f5"
      }
    });
    const mailOptions = {
      from:'mikiyasgetnet2@gmail.com',
      to:email,
      subject:emailType == 'RESET'?"Reset Password":"Verify Email",
      html:`<p>Click <a href="${process.env.DOMAIN}/varifyemail?token=${hashedToken}">here</a> to ${emailType == 'RESET'?'Reset your password':'Verify'} your email</p>`
    }
    const mailResponse = await transport.sendMail(mailOptions)
  return mailResponse
  } catch (error:any) {
    throw new Error(error.message)
  }
}