/* ---------- Productos ---------- */
const formProducts = document.getElementById("form-products");
const title = document.getElementById("product-title");
const price = document.getElementById("product-price");
const image = document.getElementById("product-image");

// Agrega productos
formProducts.addEventListener("submit", async (e) => {
    e.preventDefault()
    try {
        await fetch("/productos", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                title: title.value,
                price: price.value,
                image: image.value
            })
        })
        location.reload();
    } catch (err) {
        console.log(err);
    }
})

// Imprime la tabla de productos en index.html
const getProducts = async () => {
    try {
        let res = await fetch("/productos")
        let json = await res.json()
    
        let data = await getTemplate("./templates/products.ejs")
        let template = await ejs.compile(data)
        let cards = await template({products: json})
        document.querySelector(".cards-container").innerHTML = cards
    } catch (error) {
        document.querySelector(".cards-container").innerHTML = `<p>Error al cargar los productos</p>`
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getProducts();
})

async function getTemplate(url){
    try {
        const res = await fetch(url);
        return await res.text();
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("click", () => {
    if (e.target.matches(".edit")) {
        const form = document.querySelector(".form")
        form.id.value = e.target.dataset.id
        form.title.value = e.target.dataset.title
        form.price.value = e.target.dataset.price
        form.image.value = e.target.dataset.image
    }

    if (e.target.matches(".delete")) {
        let isDelete = confirm(`¿Está seguro de eliminar el producto ${e.target.dataset.id}?`)

        if (isDelete) {
            try {
                await fetch(`/products/${e.target.dataset.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    }
                })
                location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    }
})