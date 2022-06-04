let db = "mongo"
let products;
let carts;

switch (db) {
    case "filesystem":
        const ProductsDaoFileSystem = require("../daos/products/productsDaoFileSystem");
        const CartsDaoFileSystem = require("../daos/carts/cartsDaoFileSystem");
        products = new ProductsDaoFileSystem()
        carts = new CartsDaoFileSystem()
        break;
    case "mongo":
        const ProductsDaoMongoDB = require("../daos/products/productsDaoMongoDB");
        const CartsDaoMongoDB = require("../daos/carts/cartsDaoMongoDB");
        products = new ProductsDaoMongoDB()
        carts = new CartsDaoMongoDB()
        break;
    case "firebase":
        const ProductsDaoFirebase = require("../daos/products/productsDaoFirebase");
        const CartsDaoFirebase = require("../daos/carts/cartsDaoFirebase");
        products = new ProductsDaoFirebase()
        carts = new CartsDaoFirebase()
        break;
    default:
        break;
}

module.exports = {
    products, 
    carts
}