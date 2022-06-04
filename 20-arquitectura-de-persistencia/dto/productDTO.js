
class ProductDTO {
    constructor(product) {
        this.title = product.title;
        this.image = product.image;
        this.price = product.price
    }

    getTitle() {
        return this.title
    }

    getImage() {
        return this.image
    }

    getPrice() {
        return this.price;
    }
}

module.exports = ProductDTO;