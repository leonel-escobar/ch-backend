const express = require("express")
const router = express.Router()
const { products, carts } = require("../containers/index")

// Crea un carrito y devuelve su id
router.post("/", async (req, res) => {
    let idProduct = req.body.product
    let newProduct = await products.getById(idProduct)
    
    let newCart = {
        products: []
    }
    const addCart = await carts.saveCart(newCart, newProduct)
    res.json(addCart)
})

// Vacía un carrito y lo elimina
router.delete("/:id", (req, res) => {
    const cartId = req.params.id
    const cartRemoved = carts.removeCart(cartId)
    res.json(cartRemoved)
})

// Muestra los productos de un carrito por id
router.get("/:id/productos", async (req, res) => {
    const id = req.params.id
    const products = await carts.cartById(id)
    res.json(products)
})

// Incorpora productos por su id
router.post("/:id/productos", async (req, res) => {
    const id = req.params.id
    const product = req.body.product
    const newProduct = await products.getById(product)
    const addProduct = await carts.addProduct(id, newProduct)
    res.json(addProduct)
})

// Elimina un producto por id de carrito y producto
router.delete("/:id/productos/:idProd", async (req, res) => {
    const id = req.params.id;
    const idProd = req.params.idProd;
    const removeProduct = await carts.removeProduct(id, idProd)
    res.json(removeProduct)
})

module.exports = router;