const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController")

// Devuelve todos los productos
router.get("/productos", productsController.getProducts)

// Recibe y guarda un nuevo producto
router.post("/productos", productsController.saveProduct)

// Actualiza un producto por su id
router.put("/productos/:id", productsController.updateProduct)

// Elimina un producto por su id
router.delete("/productos/:id", productsController.deleteProduct)

module.exports = router;