const axios = require("axios");

const url = "http://localhost:8080"

async function getProducts() {
    try {
        const res = await axios.get(`${url}/api/productos`)
        console.log(res);
        return await res
    } catch (err) {
        console.log("Error al obtener el listado de productos");
    }
}

async function addProducts() {
    axios.post(`${url}/api/productos`, {
        title: "producto test",
        image: "image test",
        price: "123"
    })
    .then(function (res) {
        console.log(res);
    })
    .catch(function (err) {
        console.log("Error al agregar un producto", err);
    })
}

async function updateProduct() {
    const products = await getProducts()
    const id = await products.data[0].id
    await axios.put(`${url}/api/productos/${id}`, {
        title: "producto de prueba actualizado",
        image: "Imagen de prueba actualizada",
        price: "456"
    })
    .then(function (res) {
        console.log("Producto actualizado", res);
    })
    .catch(function (err) {
        console.log("Error al modificar un producto", err);
    })
} 

async function deleteProduct() {
    const products = await getProducts()
    const id = await products.data[0].id
    try {
        await axios.delete(`${url}/api/productos/${id}`)
        console.log("Producto eliminado");
    } catch (err) {
        console.log("Error al eliminar un producto", err);
    }
}

async function runTest() {
    await getProducts();
    await addProducts();
    await updateProduct();
    await deleteProduct();
}

runTest()
