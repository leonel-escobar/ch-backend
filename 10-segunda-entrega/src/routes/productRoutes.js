const express = require("express");
const router = express.Router();
let { products } = require("../containers/index")

// Devuelve todos los productos
router.get("/", async (req, res) => {
    const data = await products.getAll()
    res.send(data)
})

// Devuelve un producto por su id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const data = await products.getById(id)
    res.send(data)
})

// Recibe y guarda un nuevo producto
router.post("/", async (req, res) => {
    
    let product = req.body

    const newProduct = await products.save(product)
    res.send(newProduct)
})

// Actualiza un producto por su id
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    
    let product = req.body

    const update = await products.updateById(id, product)
    res.send(update)
})

// Elimina un producto por su id
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await products.deleteById(id)
    res.send(deleted)
})

module.exports = router;