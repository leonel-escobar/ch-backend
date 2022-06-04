const { createTransport } = require("nodemailer");
require("dotenv").config();

const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: "587",
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS
    }
})

const sendEmail = (email, subject, message) => {
    const mailOptions = {
        from: "Servidor Node.js",
        to: email,
        subject: subject,
        html: message
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
    })
}

module.exports = sendEmail;