const mongoose = require("mongoose")
const config = require("../utils/config")

const url = config.DBConfig.mongodb.url;
mongoose.connect(url);

class MongodbContainer {
    constructor (collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema)
    }

    async save(obj) {
        try {
            return await this.collection.create(obj);
        } catch (err) {
            console.log(err);
        }
    }

    async getAll() {
        try {
            return await this.collection.find();
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = MongodbContainer;