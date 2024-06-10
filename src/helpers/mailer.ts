import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email , emailType , userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString() , 10)

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId , 
                {verifyToken: hashedToken , verifyTokenExpiry : Date.now() + 3600000}
                )
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId , 
                {forgotPasswordToken: hashedToken , forgotPasswordTokenExpiry : Date.now() + 3600000}
                )
        }

        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "4d56ad0916c6dc",
            pass: "da4d4ed28298e4"
          }
        });

          const mailOptions = {
            from: '3603kartiklakra@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
            
            html: `<p>Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy paste the link below in your browser.
            <br />
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse


    } catch (error:any) {
        throw new Error(error.message);
    }
}