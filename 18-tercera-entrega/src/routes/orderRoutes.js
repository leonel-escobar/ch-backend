const express = require("express");
const router = express.Router();
const OrdersDaoMongoDB = require("../daos/orders/ordersDaoMongoDB");
const orders = new OrdersDaoMongoDB();
const sendEmail = require("../nodemailer/email");
const sendWhatsApp = require("../twilio/twilioWapp");

require("dotenv").config()

router.post("/send-order", async (req, res) => {
    const newOrder = {
        username: req.body.username,
        email: req.body.email,
        address: req.body.address,
        tel: req.body.tel,
        products: req.body.products
    }
    await orders.save(newOrder)
    sendEmail(process.env.ADMIN_EMAIL, `Nuevo pedido de: ${req.body.username}, ${req.body.email}`, JSON.stringify(req.body.products))
    await sendWhatsApp(`Nuevo pedido de ${req.user.username}`, process.env.ADMIN_NUMBER)
    res.send(newOrder)
})

module.exports = router;