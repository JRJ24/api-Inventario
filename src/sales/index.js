const express = require("express");
const router = express.Router();

const {SalesController} = require("./controllers");

module.exports.SalesAPI = (app) => {
    router
        .get("/", SalesController.getSales) // http://localhost:3000/api/sales/
        .get("/:id", SalesController.getSaleById) // http://localhost:3000/api/sales/:id
        .post("/create", SalesController.createSale) // http://localhost:3000/api/sales/create
        .put("/update/:id", SalesController.updateSale) // http://localhost:3000/api/sales/update
        .delete("/delete/:id", SalesController.deleteSale) // http://localhost:3000/api/sales/delete

    app.use("/api/sales", router)
}