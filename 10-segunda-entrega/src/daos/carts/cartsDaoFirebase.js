const FirebaseContainer = require("../../containers/firebaseContainer")
const ProductsDaoFirebase = require("../../daos/products/productsDaoFirebase")

class CartsDaoFirebase extends FirebaseContainer {
    constructor() {
        super("carts")
        this.product = new ProductsDaoFirebase()
    }

    async saveCart(cart, product) {
        try {
            const allProducts = await this.product.getAll()
            const newProduct = allProducts.find(el => el.title === product.title)
            cart.products.push(newProduct)
            const newCart = await this.query.add(cart).then(doc => doc.id)
            return {id: newCart}
        } catch (err) {
            console.log(err);
        }
    }

    async removeCart(id) {
        try {
            const doc = this.query.doc(id)
            await doc.delete()
        } catch (err) {
            console.log();
        }
    }
    
    async addProduct(id, product) {
        try {
            const allProducts = await this.product.getAll()
            const newProduct = allProducts.find(el => el.title === product.title)
            this.query.doc(id).update({
                products: this.FieldValue.arrayUnion(newProduct)
            });
        } catch (err) {
            console.log(err);
        }
    }

    async cartById(id) {
        try {
            let doc = this.query.doc(id)
            let item = await doc.get()
            return item.data().products 
        } catch (err) {
            console.log(err);
        }
    }

    async removeProduct(id, prodId) {
        try {
            const cart = await this.cartById(id)
            const newCart = cart.filter(el => el.id !== prodId)
            await this.query.doc(id).set({
                products: newCart
            }); 
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = CartsDaoFirebase;