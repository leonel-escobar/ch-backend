const socket = io.connect();

/* ---------- Productos ---------- */
const formProducts = document.getElementById("form-products");
const title = document.getElementById("product-title");
const price = document.getElementById("product-price");
const image = document.getElementById("product-image");

const getProducts = async () => {
    try {
        let res = await fetch("/api/productos-test")
        let json = await res.json()
        console.log(json);
        let data = await getTemplate("table.ejs")
        let template = ejs.compile(data)
        let table = template({products: json})
        document.querySelector(".table-container").innerHTML = table
    } catch (error) {
        tableContainer.innerHTML = `<p>No hay productos para mostrar</p>`
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
const userEmail = document.getElementById("user-email");
const userName = document.getElementById("user-name");
const userSurname = document.getElementById("user-surname");
const userAge = document.getElementById("user-age");
const userAlias = document.getElementById("user-alias");
const userAvatar = document.getElementById("user-avatar");
const text = document.getElementById("new-message");
const chatMessages = document.getElementById("chat-messages");
const formChat = document.getElementById("form-message");

formChat.addEventListener("submit", e => {
    e.preventDefault();
    const newMessage = {
        author: {
            email: userEmail.value,
            name: userName.value,
            surname: userSurname.value,
            age: userAge.value,
            alias: userAlias.value,
            avatar: userAvatar.value
        },
        text: text.value,
    }
    socket.emit("newMessage", newMessage);
})    

// Recibe e imprime todos los mensajes actualizados
socket.on("messages", async (messages) => {

    // Normalizr schemas
    const authorSchema = new normalizr.schema.Entity("author", {}, {idAttribute: "email"})

    const textSchema = new normalizr.schema.Entity("text", {
        author: authorSchema
    }, {idAttribute: "id"})

    const messagesSchema = new normalizr.schema.Entity("messages", {
        messages: [textSchema]
    })

    const denormalizedMessages = await normalizr.denormalize(
        messages.result,
        messagesSchema,
        messages.entities
    )

    const allMessages = denormalizedMessages.messages;

    chatMessages.innerHTML = "";
    for (let el of allMessages) {
        chatMessages.innerHTML += `<p>
            <span class="post-author">${el.author.email}</span> 
            <span class="post-date">[${el.date}]:</span>  
            <span class="post-text">${el.text}</span>
        </p>`;
    }
})