const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const productsRouter = require("./src/routes/productRoutes");
const cartRouter = require("./src/routes/cartRoutes");

// Middlewares
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);

app.get('/', (req, res) => {
    res.sendFile("index", {root: __dirname})
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>Error 404! La ruta solicitada no es válida</h1>');
});

// Start server
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Server listen port ${PORT}`);
})

server.on("Error", error => console.log(`Error: ${error}`));