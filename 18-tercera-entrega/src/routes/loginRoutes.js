const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("signup")
});

router.post("/signup", passport.authenticate("signup", {
    successRedirect: "/signin",
    failureRedirect: "/signin-error",
    passReqToCallback: true
}));

router.get("/signin", (req, res) => {
    res.render("signin")
});

router.post("/signin", passport.authenticate("signin", {
    successRedirect: "/",
    failureRedirect: "/signin-error",
    passReqToCallback: true
}));

router.get("/signin-error", (req, res) => {
    res.render("signin-error")
});

router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/signin")
})

module.exports = router;