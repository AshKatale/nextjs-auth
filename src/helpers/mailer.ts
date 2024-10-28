import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";


export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            service: 'gmail',
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        const mailOptions = {

            from: process.env.NODEMAILER_USER,
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset Password',
            html: `<p>Click <a href=${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword'}?token=${hashedToken}>here</a> to ${emailType === 'VERIFY' ? 'Verify your email' : 'reset your password'}</p>`
        }

       const mailRes = await transport.sendMail(mailOptions);
       return mailRes;

    } catch (error: any) {
        console.error("Error sending mail:", error.message); // Log the error
        throw new Error(error.message);
    }
} 
