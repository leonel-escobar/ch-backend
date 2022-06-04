const express = require("express");
const passport = require("passport")
const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
    res.render("loginfb")
})

loginRouter.get("/auth/facebook", passport.authenticate("facebook"))

loginRouter.get("/auth/facebook/callback", passport.authenticate("facebook", {failureRedirect: "/login-error", successRedirect: "/userdata"}))

loginRouter.get("/userdata", (req, res) => {
    if (req.isAuthenticated()) {
        const userData = {
            name: req.user.displayName,
            email: req.user.emails[0].value,
            photos: req.user.photos[0].value
        }
        res.render("user-data", {data: userData})
    } else {
        res.redirect("/")
    }
})

loginRouter.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/')
});

module.exports = loginRouter;