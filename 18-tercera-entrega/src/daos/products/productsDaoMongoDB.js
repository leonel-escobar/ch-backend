const MongodbContainer = require("../../containers/mongodbContainer");
const productSchema = require("../../models/productSchema")

class ProductsDaoMongoDB extends MongodbContainer {
    constructor() {
        super("products", productSchema)
    }
}

module.exports = ProductsDaoMongoDB;