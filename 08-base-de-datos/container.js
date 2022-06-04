const knex = require("knex")

class SQLContainer {
    constructor(options, db) {
        this.knex = knex(options);
        this.db = db
    }
    
    async save(obj) {
        try {
            await this.knex(this.db).insert(obj)
        } catch (err) {
            console.log(err);
        }
    }

    async getAll() {
        try {
            const res = await this.knex(this.db).select("*");
            return res
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = SQLContainer;