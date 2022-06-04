const express = require("express")
const router = express.Router()

const CartContainer = require("../carrito")
const carts = new CartContainer("carritos.txt")
const ProductsContainer = require("../contenedor")
const products = new ProductsContainer("productos.txt")

// Crea un carrito y devuelve su id
router.post("/", async (req, res) => {
    let idProduct = req.body.product
    let newProduct = await products.getById(idProduct)
    
    let newCart = {}
    const addCart = await carts.saveCart(newCart, newProduct)
    res.json(addCart)
})

// Vacía un carrito y lo elimina
router.delete("/:id", (req, res) => {
    const cartId = parseInt(req.params.id)
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
    const id = parseInt(req.params.id)
    const product = parseInt(req.body.product)
    const newProduct = await products.getById(product)
    const addProduct = await carts.addProduct(id, newProduct)
    res.json(addProduct)
})

// Elimina un producto por id de carrito y producto
router.delete("/:id/productos/:idProd", async (req, res) => {
    const id = parseInt(req.params.id);
    const idProd = parseInt(req.params.idProd);
    const removeProduct = await carts.removeProduct(id, idProd)
    res.json(removeProduct)
})

module.exports = router;