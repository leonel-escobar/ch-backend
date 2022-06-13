
class ProductDTO {
    constructor(product) {
        this.id = product._id
        this.title = product.title;
        this.image = product.image;
        this.price = product.price
    }

    getId() {
        return this.id
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