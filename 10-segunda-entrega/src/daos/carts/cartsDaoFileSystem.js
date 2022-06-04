const fs = require("fs");
const FileSystemContainer = require("../../containers/filesystemContainer")

class CartsDaoFileSystem extends FileSystemContainer {
    constructor() {
        super("../../carritos.txt")
    }

    // Crea un carrito y devuelve su id
    async saveCart(cart, product) {
        try {
            const carts = await this.getAll()
            
            if (carts.length) {
                cart.id = carts[carts.length - 1].id + 1
            } else {
                cart.id = 1
            }
            cart.timestamp = Date.now()
            cart.products.push(product)
            carts.push(cart)
            await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2))
            return cart
        } catch (err) {
            console.log(err);
        }
    }

    // Elimina un carrito por su id
    async removeCart(id) {
        try {
            const carts = await this.getAll()
            const newCartList = carts.filter(el => el.id !== parseInt(id))
            
            await fs.promises.writeFile(this.filePath, JSON.stringify(newCartList, null, 2))
        } catch (err) {
            console.log(err);
        }
    }

    // Devuelve todos los productos de un carrito por su id
    async cartById(id) {
        const carts = await this.getAll()
        const cart = carts.find(el => el.id === parseInt(id))
        
        if (cart) {
            return cart.products
        } else {
            return {msg: "El carrito no existe"}
        }
    }

    // Incorporar productos al carrito por id
    async addProduct(id, product) {
        try {
            const carts = await this.getAll()
            const cart = await carts.find(el => el.id === parseInt(id))
            cart.products.push(product)

            await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2))
        } catch (err) {
            console.log(err);
        }
    }

    // Elimina un producto por su id de carrito y producto
    async removeProduct(id, prodId) {
        try {
            const carts = await this.getAll()
            const cart = carts.find(el => el.id === parseInt(id))
            const product = cart.products.find(el => el.id === parseInt(id))
            
            if (!cart && !product) {
                return {msg: "No se encontró el producto"}
            } else {
                cart.products = cart.products.filter(el => el.id !== parseInt(prodId))
                await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2))
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = CartsDaoFileSystem;