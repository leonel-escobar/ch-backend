const mongoose = require("mongoose")
const MongoDbClient = require("../utils/db.js")
const mongoDB = new MongoDbClient()

class MongodbContainer {
    constructor (collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema)
    }

    async getById(id) {
        try {
            return await this.collection.findById(id)
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = MongodbContainer;