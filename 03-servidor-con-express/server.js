const express = require('express');
const app = express();
const PORT = 8080;
const Contenedor = require('./contenedor');
const productos = new Contenedor('./archivo.txt');

const server = app.listen(PORT, () => {
    console.log(`Servidor con express en el puerto ${server.address().port}`);
})
server.on("Error", error => console.log(`Error en el servidor: ${error}`));

app.get("/productos", async (req, res) => {
    res.send(await productos.getAll())
})

app.get("/productoRandom", async (req, res) => {
    let prodList = await productos.getAll();
    let id = parseInt(Math.random() * ((prodList.length + 1) - 1) + 1);
    res.send(await productos.getById(id))
})

