const mongoose = require("mongoose")
const schemaMessage = require("./models/message")
const config = require("./utils/config")

const url = config.mongodb.url;
mongoose.connect(url);

class ChatMessages {
    constructor () {
        this.collection = mongoose.model("mensajes", schemaMessage)
    }

    async save(obj) {
        try {
            return await this.collection.create(obj)
        } catch (err) {
            console.log(err);
        }
    }

    async getAll() {
        try {
            return await this.collection.find()
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = ChatMessages;