const MongodbContainer = require("../../containers/mongoDBContainer");
const cartSchema = require("../../models/cartSchema");
const MongoDbClient = require("../../utils/db.js");
const mongoDB = new MongoDbClient();

class CartsDaoMongoDB extends MongodbContainer {
    constructor() {
        super("carts", cartSchema)
        mongoDB.connect()
    }

    async saveCart(cart) {
        try {
            const createCart = await this.collection.create(cart)
            return createCart._id
        } catch (err) {
            console.log(err)
        }
    }

    async removeCart(id) {
        try {
            return await this.collection.deleteOne({"_id": id})
        } catch (err) {
            console.log(err)
        }
    }

    async addProduct(id, product) {
        try {
            return this.collection.updateOne({"_id": id}, {$push: {products: product}})
        } catch (err) {
            console.log(err)
        }
    }

    async cartById(id){
        try {
            const cart = await this.collection.findOne({"_id": id})
            return cart.products
        } catch (err) {
            console.log(err)
        }
    }

    async removeProduct(id, prodId) {
        try {
            await this.collection.updateOne({"_id": id}, {$pull: {products: {"_id": prodId}}})
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = CartsDaoMongoDB;