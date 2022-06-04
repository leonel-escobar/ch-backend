const mongoose = require("mongoose")
const config = require("../utils/config")

const url = config.mongodb.url;
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

    async getById(id) {
        try {
            return await this.collection.findById(id)
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

    async updateById(id, newData) {
        try {
            await this.collection.updateOne({_id: id}, newData)
        } catch (err) {
            console.log(err);
        }
    }

    async deleteById(id) {
        try {
            await this.collection.deleteOne({_id: id})
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = MongodbContainer;