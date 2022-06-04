const tableContainer = document.querySelector(".table-container")
let cart = JSON.parse(sessionStorage.getItem("cart"))

// Obtiene los productos e imprime el carrito
const getProducts = async () => {
    try {
        let res = await fetch(`/api/carrito/${cart._id || cart.id}/productos`)
        let json = await res.json()
        console.log(json);
        let data = await getTemplate("../templates/cart.ejs")
        let template = await ejs.compile(data)
        let table = await template({products: json})
        tableContainer.innerHTML = table
    } catch (error) {
        tableContainer.innerHTML = `<p>No hay productos para mostrar</p>`
    }
}

// Obtiene el contenido de la plantilla
async function getTemplate(url) {
    try {
        const res = await fetch(url);
        return await res.text();
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getProducts();
})

document.addEventListener("click", async (e) => {
    if (e.target.matches(".remove")) {
        try {
            await fetch(`/api/carrito/${cart._id || cart.id}/productos/${e.target.dataset.id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                },
            })
            location.reload()
        } catch (err) {
            console.log("Error al eliminar un producto", err);
        }
    }

    if (e.target.matches(".remove-cart")) {
        try {
            await fetch(`/api/carrito/${cart._id || cart.id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                },
            })
            sessionStorage.clear()
            location.reload()
        } catch (err) {
            console.log("Error al eliminar el carrito", err);
        }
    }
})