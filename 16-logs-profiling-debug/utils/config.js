require("dotenv").config()

const appId = process.env.FB_APP_ID
const appSecret = process.env.FB_APP_SECRET

module.exports = {
    appId,
    appSecret
}