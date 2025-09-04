const express = require("express");
const router = express.Router();

const {ProductsController} = require("./controllers");

module.exports.ProductsAPI = (app) => {
    router
        .get("/", ProductsController.getProducts) // http://localhost:3000/api/products/
        .get("/report", ProductsController.generateReport) // http://localhost:3000/api/products/report
        .get("/:id", ProductsController.getProductById) // http://localhost:3000/api/products/:id
        .post("/create", ProductsController.createProduct) // http://localhost:3000/api/products/create
        .put("/update/:id", ProductsController.updateProduct) // http://localhost:3000/api/products/update
        .delete("/delete/:id", ProductsController.deleteProduct) // http://localhost:3000/api/products/delete

    app.use("/api/products", router)
}