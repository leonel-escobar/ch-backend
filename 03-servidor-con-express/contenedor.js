const fs = require('fs');

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async save(obj) {
        /*  Recibe un objeto y lo guarda en el archivo,
        devuelve el id asignado al objeto  */
        const currentData = await this.getAll()
        const dataArr = [];
        if (currentData) {
            dataArr.push(...currentData);
            obj.id = dataArr.length + 1;
        } else {
            obj.id = 1;
        }
        dataArr.push(obj);
        
        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify(dataArr, null, 4))
            console.log("Objeto agregado", obj);
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        //  Devuelve un objeto por id
        const currentData = await this.getAll()
        let objById = currentData.find(el => el.id === id)
        if (objById) {
            console.log("Objeto obtenido por id: ", objById);
            return objById;
        } else {
            console.log(null);
        }
    }

    async getAll() {
        //  Devuelve un array con los objetos del archivo
        try {
            const contenido = await fs.promises.readFile(this.archivo, "utf-8")
            const currentData = JSON.parse(contenido)
            return currentData
        } catch (error) {
            return null
        }
    }

    async deleteById(id) {
        //  Elimina del archivo un objeto por id
        const currentData = await this.getAll()
        let deleteObj = currentData.filter(el => el.id !== id)
        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify(deleteObj, null, 4))
            console.log("Objeto eliminado por id", id);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        // Elimina todos los objetos del archivo
        try {
            await fs.promises.writeFile(this.archivo, "")
            console.log("Contenido del archivo eliminado");
        } catch (error) {
            console.log(error);
        }
    }
};

const productoA = {
    titulo: "Remera",
    precio: 2500,
}

const productoB = {
    titulo: "Buzo",
    precio: 3200,
}

const productoC = {
    titulo: "Campera",
    precio: 5800,
}

const nuevoArchivo = new Contenedor("archivo.txt")

async function ejecutarMetodos() {
    //await nuevoArchivo.save(productoA)
    //await nuevoArchivo.save(productoB)
    //await nuevoArchivo.save(productoC)
}

ejecutarMetodos()

module.exports = Contenedor;