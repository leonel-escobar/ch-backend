const passport = require("passport");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;
const usersDaoMongoDB = require("../daos/users/usersDaoMongoDB");
const usersDB = new usersDaoMongoDB();
const sendEmail = require("../nodemailer/email")

require("dotenv").config();

// Passport
passport.serializeUser((user, done) => {
    done(null, user.email)
})

passport.deserializeUser(async (email, done) => {
    const user = await usersDB.findByEmail(email)
    done(null, user)
})

passport.use("signup", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const userExists = await usersDB.findByName(username)

    if (userExists) {
        return done(null, false)
    } else {
        const newUser = {
            username: username,
            password: encryptPassword(password),
            email: req.body.email,
            tel: req.body.tel,
            address: req.body.address,
            age: req.body.age,
            avatar: req.body.avatar
        }
        await usersDB.save(newUser)
        sendEmail(process.env.ADMIN_EMAIL, "Nuevo registro", JSON.stringify(newUser))
        done(null, newUser)
    }
}))

passport.use("signin", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await usersDB.findByEmail(email)
    const passwordIsValid = comparePassword(password, user)

    if (!user && !passwordIsValid) {
        console.log("Los datos no corresponden un usuario");
        return done(null, false)
    } else {
        return done(null, user)
    }
}))

// bcrypt
const encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

const comparePassword = (password, user) => {
    return bcrypt.compareSync(password, user.password)
}