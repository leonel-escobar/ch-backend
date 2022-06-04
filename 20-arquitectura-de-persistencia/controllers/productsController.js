const { products } = require("../containers/factory.js")

const productsController = {
    getProducts: async (req, res) => {
        const data = await products.getAll()
        res.send(data)
    },

    saveProducts: async (req, res) => {
        let product = req.body
        const newProduct = await products.save(product)
        res.send(newProduct)
    }
}

module.exports = productsController;