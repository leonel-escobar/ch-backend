const FirebaseContainer = require("../../containers/firebaseContainer")

class ProductsDaoFirebase extends FirebaseContainer {
    constructor() {
        super("products")
    }
}

module.exports = ProductsDaoFirebase;