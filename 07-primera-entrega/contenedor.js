const fs = require("fs");

class ProductsContainer {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async save(obj) {
        const products = await this.getAll()
        if (products.length) {
            obj.id = products[products.length - 1].id + 1;
        } else {
            obj.id = 1
        }
        obj.timestamp = Date().toLocaleString()
        products.push(obj)

        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2))
        } catch (err) {
            console.log("Error al guardar un producto", err);
        }
    }

    async getById(id) {
        const products = await this.getAll()
        let objById = products.find(el => el.id === parseInt(id))
        return objById
    }

    async getAll() {
        try {
            const res = await fs.promises.readFile(this.filePath, "utf-8")
            const products = JSON.parse(res)
            return products
        } catch (error) {
            return []
        }
    }

    async updateById(id, newData) {
        const products = await this.getAll()
        const objUpdate = products.find(el => el.id === parseInt(id))
        
        objUpdate.timestamp = Date().toLocaleString();
        objUpdate.title = newData.title;
        objUpdate.description = newData.description;
        objUpdate.code = newData.code
        objUpdate.image = newData.image;
        objUpdate.price = parseInt(newData.price);
        objUpdate.stock = parseInt(newData.stock);
        
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2))
        } catch (err) {
            console.log("Error al guardar un producto", err);
        }
    }

    async deleteById(id) {
        const products = await this.getAll()
        let updatedProducts = products.filter(el => el.id !== parseInt(id))

        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(updatedProducts, null, 2))
        } catch (err) {
            console.log("Error al actualizar un producto", err);
        }
    }
}

module.exports = ProductsContainer;