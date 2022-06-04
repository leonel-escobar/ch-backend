const express = require("express");
const { fork } = require("child_process");
const randomRouter = express.Router()

randomRouter.get("/randoms", (req, res) => {
    const forked = fork("./randoms.js")
    forked.send(req.query)
    forked.on("message", msg => {
        res.send(msg)
    })
})

module.exports = randomRouter;