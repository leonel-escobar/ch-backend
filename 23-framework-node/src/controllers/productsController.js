const ProductsDaoMongoDB = require("../daos/products/productsDaoMongoDB");
const products = new ProductsDaoMongoDB()

const productsController = {
    getProducts: async ctx => {
        const data = await products.getAll()
        ctx.body = data
    },

    saveProduct: async ctx => {
        const product = ctx.request.body
        const newProduct = await products.save(product)
        ctx.body = newProduct
    },

    updateProduct: async ctx => {
        const id = ctx.params.id
        const product = ctx.request.body
        const update = await products.updateById(id, product)
        ctx.body = update
    },

    deleteProduct: async ctx => {
        const id = ctx.params.id
        const deleted = await products.deleteById(id)
        ctx.body = deleted
    }
}

module.exports = productsController;