const { optionsMySql } = require("./utils/optionsMySql")
const knex = require("knex")(optionsMySql)

knex.schema.createTable("products", table => {
    table.increments("id")
    table.string("title").notNullable()
    table.integer("price").notNullable()
    table.string("image").notNullable()
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