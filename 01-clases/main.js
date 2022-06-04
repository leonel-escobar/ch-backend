class User {
    constructor(name, surname, books, pets) {
        this.name = name;
        this.surname = surname;
        this.books = books;
        this.pets = pets;
    }

    getFullName() {
        console.log(`Nombre de usuario: ${this.name} ${this.surname}`)
    }

    addBooks(name, author) {
        books.push({"nombre": name, "autor": author})
    }

    getBookNames() {
        const bookTitles = this.books.map(el => el.nombre)
        console.log(`Libros del usuario: ${bookTitles}`)
    }

    addPet(petName) {
        pets.push(petName)
    }

    countPets() {
        console.log(`Mascotas del usuario: ${this.pets.length}`)
    }
}

const pets = []
const books = []

const newUser = new User("Leonel", "Escobar", books, pets)

newUser.addBooks("El señor de los anillos", "J.R.R Tolkien")
newUser.addBooks("El Silmarillion", "J.R.R Tolkien")
newUser.addPet("Mithrandir")
newUser.addPet("Aragorn")
newUser.getFullName()
newUser.countPets()
newUser.getBookNames()