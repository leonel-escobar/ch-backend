const MongodbContainer = require("../../containers/mongodbContainer");
const orderSchema = require("../../models/orderSchema")

class OrdersDaoMongoDB extends MongodbContainer {
    constructor() {
        super("orders", orderSchema)
    }
}

module.exports = OrdersDaoMongoDB;