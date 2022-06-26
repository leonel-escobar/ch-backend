const socket = io.connect();

/* ---------- Logout ---------- */
document.addEventListener("click", (e) => {
    if (e.target.matches(".logout")) {
        window.location.href = "/logout"
    }
})

/* ---------- Productos ---------- */
const formProducts = document.getElementById("form-products");
const title = document.getElementById("product-title");
const price = document.getElementById("product-price");
const image = document.getElementById("product-image");

// Agrega productos
formProducts.addEventListener("submit", async (e) => {
    e.preventDefault()
    try {
        await fetch("/api/productos", {
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
        let res = await fetch("/api/productos")
        let json = await res.json()
    
        let data = await getTemplate("./table.ejs")
        let template = ejs.compile(data)
        let cards = template({products: json})
        document.querySelector(".table-container").innerHTML = cards
    } catch (error) {
        document.querySelector(".table-container").innerHTML = `<p>Error al cargar los productos</p>`
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getProducts();
})

async function getTemplate (url){
    try {
        const res = await fetch(url);
        return await res.text();
    } catch (error) {
        console.log(error);
    }
}

/* ---------- Chat ---------- */
const author = document.getElementById("user-email");
const text = document.getElementById("new-message");
const chatMessages = document.getElementById("chat-messages");
const formChat = document.getElementById("form-message");

formChat.addEventListener("submit", e => {
    e.preventDefault();
    const newMessage = {author: author.value, text: text.value}
    socket.emit("newMessage", newMessage);
})    

// Recibe e imprime todos los mensajes actualizados
socket.on("messages", messages => {
    chatMessages.innerHTML = "";
    for (let el of messages) {
        chatMessages.innerHTML += `<p>
            <span class="post-author">${el.author}</span> 
            <span class="post-date">[${el.date}]:</span>  
            <span class="post-text">${el.text}</span>
        </p>`;
    }
})