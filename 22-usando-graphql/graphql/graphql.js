const { buildSchema } = require("graphql");
const { products } = require("../containers/factory")

// Schema
const schema = buildSchema(`
    type Product {
        id: String,
        title: String,
        image: String
        price: Int,
    }
    input ProductInput {
        title: String,
        image: String
        price: Int,
    }
    type Query {
        getProducts: [Product]
    }
    type Mutation {
        saveProduct(product: ProductInput): Product
        updateProduct(id: String, product: ProductInput): Product
        deleteProduct(id: String): Product
    }
`);

// Controllers
const getProducts = async () => {
    const data = await products.getAll()
    return data
}

const saveProduct = async ({product}) => {
    const newProduct = await products.save(product)
    return newProduct
}

const updateProduct = async ({id, product}) => {
    const update = await products.updateById(id, product)
    return update
}

const deleteProduct = async ({id}) => {
    const deleted = await products.deleteById(id)
    return deleted
}

// Root Value
const root = {
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}

module.exports = {
    schema,
    root
};