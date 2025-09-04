const express = require("express");

const {Response} = require("../common/response");
const createError = require("http-errors");

module.exports.IndexAPI = (app) => {
    const router = express.Router();

    router.get("/", (req, res) => {
        const menu = {
            products: `http://${req.headers.host}/api/products`,
            users: `http://${req.headers.host}/api/users`,
            sales: `http://${req.headers.host}/api/sales`
        }
        Response.success(res, 200, "Welcome to the API", menu);
    });

    app.use("/", router);
}

module.exports.NotFoundAPI = (app) => {
    app.use((req, res) => {
        Response.error(res, new createError.NotFound());
    });
}   