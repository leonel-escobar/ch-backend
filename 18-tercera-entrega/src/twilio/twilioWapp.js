require("dotenv").config
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function sendWhatsApp(message, number) {
    try {
        await client.messages.create({
            body: message,
            from: "whatsapp:+14155238886",
            to: `whatsapp:${number}`,
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = sendWhatsApp;