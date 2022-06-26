const MongodbContainer = require("../../containers/mongodbContainer");
const productSchema = require("../../models/productSchema")
const MongoDbClient = require("../../utils/db.js")
const mongoDB = new MongoDbClient()
const ProductDTO = require("../../dto/productDTO.js")

class ProductsDaoMongoDB extends MongodbContainer {
    constructor() {
        super("products", productSchema)
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
            const products = await this.collection.find();
            return products.map(el => new ProductDTO(el));
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

module.exports = ProductsDaoMongoDB;