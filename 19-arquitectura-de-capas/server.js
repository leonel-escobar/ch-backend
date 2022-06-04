const express = require("express");
const compression = require("compression")
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const logger = require("./utils/winston");
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

/* ---------- Routers ---------- */
const loginRouter = require("./routes/loginRouter")
const productsRouter = require("./routes/productsRouter")
const randomRouter = require("./routes/randomRouter")

/* ---------- Middlewares ---------- */
app.use(express.json());
app.use(compression())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
require("./passport-facebook/passportFacebook")

/* ---------- View engine ---------- */
app.set("view engine", "ejs");
app.set("views", "./views");

/* ---------- Session ---------- */
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))

app.use(passport.initialize());
app.use(passport.session());

/* ---------- Websockets ---------- */
const MessagesDaoMongoDB = require("./daos/messagesDaoMongoDB");
const chatData = new MessagesDaoMongoDB();

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");
    
    // Mensajes del chat
    socket.emit("messages", await chatData.getAll());
    
    socket.on("newMessage", async newMessage => {
        newMessage.date = new Date().toLocaleString();
        await chatData.save(newMessage);
        io.sockets.emit("messages", await chatData.getAll());
    });
});

/* ---------- Routers ---------- */
app.use(loginRouter)
app.use("/api", productsRouter)
app.use("/api", randomRouter)

/* ---------- Start server ---------- */
const PORT = parseInt(process.argv[2]) || 8080;

const server = httpServer.listen(PORT, () => {
    logger.info(`Servidor escuchando en el puerto ${server.address().port}`);
})
server.on("Error", error => logger.error(`Error en el servidor ${error}`));