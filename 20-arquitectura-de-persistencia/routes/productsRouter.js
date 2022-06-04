const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController")

// Devuelve todos los productos
router.get("/productos", productsController.getProducts)

// Recibe y guarda un nuevo producto
router.post("/productos", productsController.saveProducts)

module.exports = router;