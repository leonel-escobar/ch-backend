const express = require("express");
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io")
const SQLContainer = require("./container");

// SQL Config
const { optionsMySql } = require("./utils/optionsMySql")
const { optionsSQLite } = require("./utils/optionsSQLite")

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// SQL Containers
const chatData = new SQLContainer(optionsSQLite, "messages");
const productsData = new SQLContainer(optionsMySql, "products");

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");
    
    // Productos
    socket.emit("totalProducts", await productsData.getAll())

    socket.on("newProduct", async newProduct => {
        await productsData.save(newProduct)
        io.sockets.emit("totalProducts", await productsData.getAll())
    });

    // Mensajes del chat
    socket.emit("messages", await chatData.getAll());
    
    socket.on("newMessage", async newMessage => {
        newMessage.date = new Date().toLocaleString();
        await chatData.save(newMessage);
        io.sockets.emit("messages", await chatData.getAll());
    });
});

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

const PORT = 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
})

server.on("Error", error => console.log(`Error en el servidor ${error}`));