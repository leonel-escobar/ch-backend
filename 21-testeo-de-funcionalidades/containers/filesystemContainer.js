const fs = require("fs");

class FileSystemContainer {
    constructor(archivo) {
        this.archivo = archivo;
    }
    
    async save(obj) {
        /*  Recibe un objeto y lo guarda en el archivo,
            devuelve el id asignado al objeto  */
        const currentData = await this.getAll()

        if (currentData.length != 0) {
            obj.id = currentData[currentData.length - 1].id + 1;
        } else {
            obj.id = 1;
        }

        currentData.push(obj);
        
        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify(currentData, null, 4))
            console.log("Objeto agregado", obj);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        //  Devuelve un array con los objetos del archivo
        try {
            const contenido = await fs.promises.readFile(this.archivo, "utf-8")
            const currentData = JSON.parse(contenido)
            return currentData
        } catch (error) {
            return []
        }
    }

    async updateById(id, newData) {
        const products = await this.getAll()
        const objUpdate = products.find(el => el.id === parseInt(id))
        
        objUpdate.timestamp = Date().toLocaleString();
        objUpdate.title = newData.title;
        objUpdate.image = newData.image;
        objUpdate.price = parseInt(newData.price);
        
        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify(products, null, 2))
        } catch (err) {
            console.log("Error al guardar un producto", err);
        }
    }

    async deleteById(id) {
        const products = await this.getAll()
        let updatedProducts = products.filter(el => el.id !== parseInt(id))

        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify(updatedProducts, null, 2))
        } catch (err) {
            console.log("Error al actualizar un producto", err);
        }
    }
}

module.exports = FileSystemContainer;