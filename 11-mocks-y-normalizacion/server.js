const express = require("express");
const { normalize, schema } = require("normalizr");
const util = require("util")
const Products = require("./products")
const products = new Products()
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");

const ChatMessages = require("./contenedor");

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const chatData = new ChatMessages();

// Normalizr schemas
const authorSchema = new schema.Entity("author", {}, {idAttribute: "email"})

const textSchema = new schema.Entity("text", {
    author: authorSchema
}, {idAttribute: "id"})

const messagesSchema = new schema.Entity("messages", {
    messages: [textSchema]
})

// Websockets
io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");
    
    io.sockets.emit("messages", await chatData.getAll());

    socket.on("newMessage", async newMessage => {
        
        await chatData.save(newMessage);
        const allMessages = await chatData.getAll()
        
        let arrMessages = []
        
        allMessages.forEach(el => {
            let message = {
                id: el._id,
                author: {
                    email: el.author.email,
                    name: el.author.name,
                    surname: el.author.surname,
                    age: el.author.age,
                    alias: el.author.alias,
                    avatar: el.author.avatar
                },
                text: el.text,
                date: el.timestamp
            }
            arrMessages.push(message)
        });

        // Normalizr
        const messagesList = {
            id: "1",
            messages: arrMessages
        }
        
        const normalizedMessages = normalize(messagesList, messagesSchema)
        
        function print(obj) {
            console.log(util.inspect(obj, true, 12, true))
        }
        
        print(normalizedMessages)
        
        const originalData = JSON.stringify(messagesList).length
        const normalizedData = JSON.stringify(normalizedMessages).length

        console.log(originalData, "Original data");
        console.log(normalizedData, "Normalized data");
        
        io.sockets.emit("messages", normalizedMessages);
    });
});

app.get("/", (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

app.get("/api/productos-test", async (req, res) => {
    const productList = await products.generarProductos()
    res.json(productList)
})

const PORT = 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
})

server.on("Error", error => console.log(`Error en el servidor ${error}`));