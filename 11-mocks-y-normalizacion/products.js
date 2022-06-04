const { faker } = require("@faker-js/faker");

class Products{
    constructor() {
        this.products = []
    }

    async generarProductos() {
        for (let i = 0; i < 6; i++) {
            let product = {
                title: faker.commerce.productName(),
                price: faker.commerce.price(100, 200),
                image: faker.image.imageUrl()
            }
            this.products.push(product)
        }
        return this.products
    }
}

module.exports = Products;