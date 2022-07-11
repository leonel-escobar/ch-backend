const Router = require("koa-router");

const productsController = require("../controllers/productsController")

const router = new Router({
    prefix: "/productos"
});

router.get("/", productsController.getProducts)
router.post("/", productsController.saveProduct)
router.put("/:id", productsController.updateProduct)
router.delete("/:id", productsController.deleteProduct)

module.exports = router;