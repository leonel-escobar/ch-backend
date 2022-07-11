const Router = require("koa-router");

const cartsController = require("../controllers/cartsController")

const router = new Router({
    prefix: "/carts"
});

router.post("/", cartsController.createCart)
router.delete("/:id", cartsController.removeCart)
router.get("/:id", cartsController.cartById)
router.post("/:id", cartsController.addProduct)
router.delete("/:id/:prodId", cartsController.removeProduct)

module.exports = router;