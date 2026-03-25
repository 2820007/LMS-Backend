import nodemailer from "nodemailer"



const sendEmail=async(options)=>{
    var transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })

const mailOptions = {
    from: "Ravi Mandal <dot123com456@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message, 
    html: `
        <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
            <div style="max-width:600px; margin:auto; background:#ffffff; padding:20px; border-radius:10px;">
                
                <h2 style="color:#333; text-align:center;">${options.appName || "LMS Platform"}</h2>
                
                <p style="font-size:16px; color:#555;">
                    Hello,
                </p>

                <p style="font-size:16px; color:#555;">
                    Your One-Time Password (OTP) for verification is:
                </p>

                <div style="text-align:center; margin:20px 0;">
                    <span style="font-size:28px; font-weight:bold; letter-spacing:5px; color:#2c3e50;">
                        ${options.otp}
                    </span>
                </div>

                <p style="font-size:14px; color:#777;">
                    This OTP is valid for <b>5 minutes</b>. Please do not share it with anyone.
                </p>

                <hr style="margin:20px 0;" />

                <p style="font-size:12px; color:#aaa; text-align:center;">
                    If you did not request this, please ignore this email.
                </p>

                <p style="font-size:12px; color:#aaa; text-align:center;">
                    © ${new Date().getFullYear()} ${options.appName || "Your LMS"}
                </p>
            </div>
        </div>
    `
}

    await transporter.sendMail(mailOptions)
}
export default sendEmail