const socket = io.connect();

/* ---------- Usuario ---------- */
document.addEventListener("DOMContentLoaded", () => {
    getUserName()
})

// Imprime el nombre de usuario obtenido
const getUserName = async () => {
    try {
        const res = await fetch("/login")
        const name = await res.json()
        
        let data = await getTemplate("logged.ejs")
        let template = ejs.compile(data)
        let userName = template(name)
        document.querySelector(".user-logged").innerHTML = userName
    } catch (err) {
        window.location.href = "/login"
    }
}

const logoutBtn = document.querySelector(".logout")

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

formProducts.addEventListener("submit", e => {
    e.preventDefault();
    const productData = {
        title: title.value,
        price: price.value,
        image: image.value
    };
    console.log(productData);
    socket.emit("newProduct", productData);
})

// Imprime la tabla de productos en index.html
socket.on("totalProducts", async products => {
    console.log(products, "products")
    
    let data = await getTemplate("table.ejs")
    let template = ejs.compile(data)
    let table = template({products: products})
    document.querySelector(".table-container").innerHTML = table
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