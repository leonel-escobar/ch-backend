const mongoose = require("mongoose")
const MongoDbClient = require("../utils/db.js")
const mongoDB = new MongoDbClient()

class MongodbContainer {
    constructor (collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema)
    }
}

module.exports = MongodbContainer;