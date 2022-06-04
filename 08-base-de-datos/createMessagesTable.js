const { optionsSQLite } = require("./utils/optionsSQLite")
const knex = require("knex")(optionsSQLite)

knex.schema.createTable("messages", table => {
    table.increments("id")
    table.string("author").notNullable()
    table.string("date").notNullable()
    table.string("text").notNullable()
})
.then(() => {
    console.log("Tabla creada");
})
.catch((err) => {
    console.log(err);
})
.finally(() => {
    knex.destroy();
});