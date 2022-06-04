const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productsRouter = require('./products');

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/productos', productsRouter);

// Start server
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
})
server.on("Error", error => console.log(`Error en el servidor ${error}`));