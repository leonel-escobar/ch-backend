const express = require('express');
const router = express.Router();

let products = []

// Devuelve todos los productos
router.get("/", (req, res) => {
    res.json(products);
})

// Devuelve un producto por id
router.get("/:id", (req, res) => {
    let id = req.params.id;
    let productById = products.find(el => el.id === parseInt(id))
    if (productById) {
        res.json(productById);
    } else {
        res.json({ error : 'producto no encontrado' })
    }
})

// Recibe y agrega un producto con su id asignado
router.post("/", (req, res) => {
    let title = req.body.titulo;
    let price = req.body.precio;
    let newProduct = {
        titulo: title,
        precio: price,
    }

    if (products.length > 0) {
        newProduct.id = products[products.length - 1].id + 1
    } else {
        newProduct.id = products.length + 1
    }

    products.push(newProduct)
    res.json(products);
})

// Recibe y actualiza un producto según su id
router.put("/:id", (req, res) => {
    let id = req.params.id;
    let productUpdate = products.find(el => el.id === parseInt(id));
    
    if (productUpdate) {
        productUpdate.titulo = req.body.titulo;
        productUpdate.precio = req.body.precio;
        res.json(products);
    } else {
        res.json({ error : 'producto no encontrado' });
    }
})

// Elimina un producto según su id
router.delete("/:id", (req, res) => {
    let id = req.params.id;
    const newArr = products.filter(el => el.id !== parseInt(id));
    products = [...newArr]
    res.json(products);
})

module.exports = router;