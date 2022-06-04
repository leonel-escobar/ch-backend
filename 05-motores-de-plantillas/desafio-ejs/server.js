const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middlewares
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

const products = []

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/productos", (req, res) => {
    res.render("products", {products: products})
})

app.post("/productos", (req, res) => {
    products.push({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image
    })
    res.redirect("/")
})

// Start server
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
})

server.on("Error", error => console.log(`Error en el servidor ${error}`));