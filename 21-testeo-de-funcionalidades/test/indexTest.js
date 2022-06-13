const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;

const testProduct = {
    title: "Producto de prueba",
    image: "Imagen de prueba",
    price: 200
}

describe("Test API REST", () => {
    describe("GET", () => {
        it("Debería retornar un status 200", async () => {
            let response = await request.get("/api/productos");
            expect(response.status).to.eql(200);
        })
    })

    describe("POST", () => {
        it("Debería incorporar un producto", async () => {
            let response = await request.post("/api/productos").send(testProduct);
            expect(response.status).to.eql(200);
            
            const product = await response.body;
            expect(product.title).to.eql(testProduct.title)
        })
    })
    
    describe("PUT", () => {
        it("Debería actualizar un producto", async () => {
            let products = await request.get("/api/productos")
            let findProduct = await products._body.find(el => el.title === testProduct.title)
            let response = await request.put(`/api/productos/${findProduct.id}`).send({
                title: "Producto actualizado",
                image: "Imagen actualizada",
                price: 456
            })
            expect(response.status).to.eql(200)
        })
    })
    
    describe("DELETE", () => {
        it("Debería eliminar un producto", async () => {
            let products = await request.get("/api/productos")
            let findProduct = await products._body.find(el => el.title === "Producto actualizado")
            let response = await request.delete(`/api/productos/${findProduct.id}`).send()
            expect(response.status).to.eql(200)
        })
    })
})