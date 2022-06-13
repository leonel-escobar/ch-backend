const mongoose = require("mongoose");
const config = require("./config.js")

class MongoDBClient {
    constructor() {
        this.client = mongoose;
    }

    async connect() {
        try {
            await this.client.connect(config.DBConfig.mongodb.url)
        } catch (err) {
            console.log("Error al conectar con la base de datos");
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close()
        } catch (err) {
            console.log("Error al desconectarse de la base de datos");
        }
    }
}

module.exports = MongoDBClient;