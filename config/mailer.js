const nodemailer = require("nodemailer");

const sendEmail = async (name ,email, subject, random) => {
    
    try {
        const transporter = nodemailer.createTransport({
            host: Variables.HOST,
            port: 465,//587
            secure: true,
            auth: {
                user: Variables.USER,
                pass: Variables.PASS,
            }
        });
     
        await transporter.sendMail({
            from: Variables.USER,
            to: email,
            subject: subject,
            html:`
            <h1>Hi ${name},</h1>
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






