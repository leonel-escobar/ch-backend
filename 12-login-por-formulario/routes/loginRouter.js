const express = require("express");
const loginRouter = express.Router();


loginRouter.get("/login", (req, res) => {
    const name = req.session.name
    if (name) {
        res.send({ name: name })
    } else {
        res.render("session")
    }
})

loginRouter.post("/login", (req, res) => {
    req.session.name = req.body.name
    res.redirect("/")
})

loginRouter.get("/logout", (req, res) => {
    const name = req.session.name
    if (name) {
        req.session.destroy(err => {
            if (!err) {
                res.render("logout", { name: name })
            } else {
                res.redirect("/")
            }
        })
    }
})

module.exports = loginRouter;