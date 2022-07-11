const CartsDaoMongoDB = require("../daos/carts/cartsDaoMongoDB")
const carts = new CartsDaoMongoDB;
const ProductsDaoMongoDB = require("../daos/products/productsDaoMongoDB")
const products = new ProductsDaoMongoDB()

const cartsController = {
    createCart: async ctx => {
        const newCart = {
            products: []
        }
        const addCart = await carts.saveCart(newCart)
        ctx.body = addCart
    },

    removeCart: async ctx => {
        const cartId = await ctx.params.id
        const cartRemoved = carts.removeCart(cartId)
        ctx.body = cartRemoved
    },

    addProduct: async ctx => {
        const id = ctx.params.id
        const product = ctx.request.body
        const newProduct = await products.getById(product._id)
        const addProduct = await carts.addProduct(id, newProduct)
        ctx.body = addProduct
    },

    cartById: async ctx => {
        const id = ctx.params.id
        const products = await carts.cartById(id)
        ctx.body = products
    },

    removeProduct: async ctx => {
        const id = ctx.params.id
        const prodId = ctx.params.prodId
        const removeProduct = await carts.removeProduct(id, prodId)
        ctx.body = removeProduct
    }
}

module.exports = cartsController;