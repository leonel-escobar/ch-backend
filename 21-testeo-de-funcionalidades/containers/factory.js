let db = "mongo"
let products;
let messages;

switch (db) {
    case "filesystem":
        const ProductsDaoFileSystem = require("../daos/products/productsDaoFileSystem");
        const MessagesDaoFileSystem = require("../daos/messages/messagesDaoFileSystem");
        products = new ProductsDaoFileSystem()
        messages = new MessagesDaoFileSystem()
        break;
    case "mongo":
        const ProductsDaoMongoDB = require("../daos/products/productsDaoMongoDB");
        const MessagesDaoMongoDB = require("../daos/messages/messagesDaoMongoDB");
        products = new ProductsDaoMongoDB()
        messages = new MessagesDaoMongoDB()
        break;
    default:
        break;
}

module.exports = {
    products, 
    messages
}