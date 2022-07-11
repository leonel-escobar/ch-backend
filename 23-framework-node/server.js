const koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const path = require("path");

// Initialize app
const app = new koa();

// Middlewares
app.use(koaBody());
app.use(koaStatic(path.join(__dirname, '/public')));

// Routes
const productsRouter = require("./src/routes/productsRouter")
const cartsRouter = require("./src/routes/cartRouter")
app.use(productsRouter.routes())
app.use(cartsRouter.routes())

// Main route
const router = new Router({
    prefix: "/"
});

router.get("/", ctx => {
    ctx.response.redirect("index.html")
})

// Star server
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor Koa escuchando en el puerto ${PORT}`);
})
server.on("error", error => console.log("Error en el servidor", error));