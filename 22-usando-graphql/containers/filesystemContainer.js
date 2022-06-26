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
}

module.exports = FileSystemContainer;