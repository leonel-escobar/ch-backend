const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

require("dotenv").config()

passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ["id", "displayName", "emails", "photos"],
    scope: ['email']
    },
    function(accessToken, refreshToken, profile, done) {
        console.log("accessToken: ", accessToken)
        console.log("refreshToken: ", refreshToken)
        console.log(JSON.stringify(profile, null, 4));
        done(null, profile)
    }    
))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})