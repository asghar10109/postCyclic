const nodemailer = require("nodemailer");

const sendEmail = async (name ,email, subject, random) => {
    
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST || 'smtp.gmail.com',
            port: 465,//587
            secure: true,
            auth: {
                user: process.env.USER || 'zafarzaeem629@gmail.com',
                pass: process.env.PASS || 'qyxrvlrzzwwungkc',
            }
        });
     
        await transporter.sendMail({
            from: process.env.USER || 'zafarzaeem629@gmail.com',
            to: email,
            subject: subject,
            html:`
            <h1>Hi ${name || "asghar"},</h1>
            <h2>OTP for ${subject}:</h2>
            <h3 style="color: green;"> your otp is ${random}</h3>           
            `
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log( "email not sent",error);
    }
};

module.exports = sendEmail;






