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
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        const mailOptions = {
            from: 'ashitosh@gmail.com',
            to: 'email',
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset Password',
            html: `<p>Click <a href=${process.env.domain}/verifyemail?token=${hashedToken}>here</a> to ${emailType === 'VERIFY' ? 'Verify your email' : 'reset your password'}</p>`
        }

       const mailRes = await transport.sendMail(mailOptions);
       return mailRes;

    } catch (error: any) {
        throw new Error(error.message);
    }
} 