const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectMongo = require("connect-mongo");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const MongoStore = connectMongo.create({
    mongoUrl: "mongodb+srv://app-backend-28220:coder28220@cluster0.p1uvb.mongodb.net/sesiones?retryWrites=true&w=majority",
    mongoOptions: advancedOptions
});

const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");
const ChatMessages = require("./contenedor");

/* ---------- Routers ---------- */
const loginRouter = require("./routes/loginRouter")

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

/* ---------- Middlewares ---------- */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(session({
    store: MongoStore,
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))

/* ---------- Websockets ---------- */
const chatData = new ChatMessages("messages.txt");
const products = []

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");
    
    // Productos
    socket.emit("totalProducts", products)

    socket.on("newProduct", newProduct => {
        products.push(newProduct);
        io.sockets.emit("totalProducts", products)
    });

    // Mensajes del chat
    socket.emit("messages", await chatData.getAll());
    
    socket.on("newMessage", async newMessage => {
        newMessage.date = new Date().toLocaleString();
        await chatData.save(newMessage);
        io.sockets.emit("messages", await chatData.getAll());
    });
});

/* ---------- Login router ---------- */
app.use(loginRouter)

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

/* ---------- Start server ---------- */
const PORT = 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
})

server.on("Error", error => console.log(`Error en el servidor ${error}`));