const MongodbContainer = require("../../containers/mongodbContainer")
const ProductsDaoMongoDB = require("../../daos/products/productsDaoMongoDB")
const cartSchema = require("../../models/cartSchema")

class CartsDaoMongoDB extends MongodbContainer {
    constructor() {
        super("carts", cartSchema)
        this.product = new ProductsDaoMongoDB()
    }

    async saveCart(cart, product) {
        try {
            const createNewCart = await this.collection.create(cart)
            await this.collection.updateOne({"_id": createNewCart._id}, {$push: {"products": product}})
            return await this.collection.findOne({"_id": createNewCart._id})
        } catch (err) {
            console.log(err);
        }
    }

    async removeCart(id) {
        try {
            return await this.collection.deleteOne({"_id": id})
        } catch (err) {
            console.log(err);
        }
    }

    async addProduct(id, product) {
        try {
            return this.collection.updateOne({"_id": id}, {$push: {products: product}})
        } catch (err) {
            console.log(err);
        }
    }

    async cartById(id) {
        try {
            const cart = await this.collection.findOne({"_id": id})
            return cart.products
        } catch (err) {
            console.log(err);
        }
    }

    async removeProduct(id, prodId) {
        try {
            await this.collection.updateOne({"_id": id}, {$pull: {products: {"_id": prodId}}})
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = CartsDaoMongoDB;