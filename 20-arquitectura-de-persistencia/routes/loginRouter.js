const express = require("express");
const passport = require("passport")
const loginRouter = express.Router();
const loginController = require("../controllers/loginController")

loginRouter.get("/", loginController.loginFb)

loginRouter.get("/auth/facebook", passport.authenticate("facebook"))

loginRouter.get("/auth/facebook/callback", passport.authenticate("facebook", {failureRedirect: "/login-error", successRedirect: "/userdata"}))

loginRouter.get("/userdata", loginController.userData)

loginRouter.get('/logout', loginController.logOut);

module.exports = loginRouter;