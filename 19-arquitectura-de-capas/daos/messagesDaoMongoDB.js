const MongodbContainer = require("../containers/mongodbContainer");
const messageSchema = require("../models/messageSchema")

class MessagesDaoMongoDB extends MongodbContainer {
    constructor() {
        super("messages", messageSchema)
    }
}

module.exports = MessagesDaoMongoDB;