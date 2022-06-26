const MongodbContainer = require("../../containers/mongodbContainer");
const messageSchema = require("../../models/messageSchema")
const MongoDbClient = require("../../utils/db.js")
const mongoDB = new MongoDbClient()
const MessageDTO = require("../../dto/messageDTO.js")

class MessagesDaoMongoDB extends MongodbContainer {
    constructor() {
        super("messages", messageSchema),
        mongoDB.connect()
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
            const messages = await this.collection.find();
            return messages.map(el => new MessageDTO(el))
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = MessagesDaoMongoDB;