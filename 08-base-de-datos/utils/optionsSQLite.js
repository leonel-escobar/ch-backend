const path = require("path")

const optionsSQLite = {
    client: "better-sqlite3",
    connection: {filename: path.resolve(__dirname, "../DB/ecommerce.sqlite")},
    useNullAsDefault: true
}

module.exports = { optionsSQLite }