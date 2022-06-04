require("dotenv").config();

const config = {
    mongodb: {
        url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.p1uvb.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
    }
}

module.exports = config;