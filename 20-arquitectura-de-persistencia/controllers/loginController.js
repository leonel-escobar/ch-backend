
const loginController = {
    loginFb: (req, res) => {
        res.render("loginfb")
    },
    
    userData: (req, res) => {
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
    },

    logOut: (req, res)=>{
        req.logout();
        res.redirect('/')
    }
}

module.exports = loginController;