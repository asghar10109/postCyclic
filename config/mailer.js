const nodemailer = require("nodemailer");

const sendEmail = async (name, email, subject, random) => {
    console.log("sendEmail....", name, email, subject, random)
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "18f0cbabde54cb",
                pass: "7855cc6fc42d66"
            }

            // host: "smtp.gmail.com",
            // port: 465,
            // secure: true,
            // auth: {
            //     user: "zafarzaeem629@gmail.com",
            //     pass: "qyxrvlrzzwwungkc"
            // }
        });

        await transporter.sendMail({
            from: process.env.USER || '18f0cbabde54cb' || 'zafarzaeem629@gmail.com',
            to: email,
            subject: subject,
            html: `
            <h1>Hi ${name || "asghar"},</h1>
            <h2>OTP for ${subject}:</h2>
            <h3 style="color: green;"> your otp is ${random}</h3>           
            `
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log("email not sent", error);
    }
};

module.exports = sendEmail;






