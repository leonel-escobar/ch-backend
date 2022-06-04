const express = require("express");
const compression = require("compression")
const cookieParser = require("cookie-parser");
const session = require("express-session");
const yargs = require("yargs/yargs") (process.argv.slice(2));
const { appId, appSecret } = require("./utils/config");
const numCPUs = require("os").cpus().length;
const winston = require("winston");
const cluster = require("cluster");
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

const app = express();
const args = yargs.argv
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

/* ---------- Winston ---------- */
const logger = winston.createLogger({
    level: "warn",
    transports : [
        new winston.transports.Console({ level: "verbose" }),
        new winston.transports.File({ filename: "./logs/warn.log", level: "warn" }),
        new winston.transports.File({ filename: "./logs/error.log", level: "error" })
    ]
})

/* ---------- Routers ---------- */
const loginRouter = require("./routes/loginRouter")
const randomRouter = require("./routes/randomRouter")

/* ---------- Middlewares ---------- */
app.use(express.json());
app.use(compression())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

passport.use(new FacebookStrategy({
    clientID: appId,
    clientSecret: appSecret,
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ["id", "displayName", "emails", "photos"],
    scope: ['email']
    },
    function(accessToken, refreshToken, profile, done) {
        console.log("accessToken: ", accessToken)
        console.log("refreshToken: ", refreshToken)
        console.log(JSON.stringify(profile, null, 4));
        done(null, profile)
    }    
))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

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
const ChatMessages = require("./contenedor");
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

/* ---------- Routers ---------- */
app.use(loginRouter)
app.use("/api", randomRouter)

/* ---------- Info ---------- */
app.get("/info", (req, res) => {
    const data = {
        arguments: process.argv,
        operatingSystem: process.platform,
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage(),
        executionPath: process.execPath,
        processId: process.pid,
        projectFolder: process.cwd(),
    }
    //console.log(data);
    res.json(data)
})

/* ---------- Start server ---------- */

const PORT = parseInt(process.argv[2]) || 8081;

// Para iniciar en otro puerto: node server.js 8085
// Para iniciar en modo cluster: node server.js 8082 cluster

// pm2 start server.js --name="server1" --watch -- 8081
// pm2 start server.js --name="server2" --watch -i max -- 8082 cluster

if (process.argv[3] === "cluster" && cluster.isMaster) {
    
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    };

    cluster.on("exit", (worker) => {
        logger.warn(`Worker ${worker.process.pid} died`)
    });

} else {
    
    const server = httpServer.listen(PORT, () => {
        logger.info(`Servidor escuchando en el puerto ${server.address().port}`);
    })

    server.on("Error", error => logger.error(`Error en el servidor ${error}`));
}