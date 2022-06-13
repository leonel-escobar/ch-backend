const { products } = require("../containers/factory.js")

const productsController = {
    getProducts: async (req, res) => {
        const data = await products.getAll()
        res.send(data)
    },

    saveProduct: async (req, res) => {
        let product = req.body
        const newProduct = await products.save(product)
        res.send(newProduct)
    },

    updateProduct: async (req, res) => {
        const id = req.params.id;
        const product = req.body;
        const update = await products.updateById(id, product)
        res.send(update)
    },

    deleteProduct: async (req, res) => {
        const id = req.params.id;
        const deleted = await products.deleteById(id)
        res.send(deleted)
    }
}

module.exports = productsController;