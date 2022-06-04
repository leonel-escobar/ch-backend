const express = require("express");
const app = express();
const path = require("path")
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

// Middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars settings
app.set("views", path.join(__dirname, "views"));

app.engine("hbs", exphbs.engine({
    defaultLayout: "index",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: "hbs"
}))

app.set("view engine", "hbs");

const products = []

app.get("/", (req, res) => {
    res.render("main")
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