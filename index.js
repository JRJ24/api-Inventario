const express = require('express');
const debug = require('debug')('app:server');

const {config} = require("./src/config/index")
const {ProductsAPI} = require("./src/products/index");
const {UsersAPI} = require("./src/users/index");
const {SalesAPI} = require("./src/sales/index");
const {IndexAPI, NotFoundAPI} = require("./src/index/index");


const app = express();

app.use(express.json());

IndexAPI(app);
ProductsAPI(app);
UsersAPI(app);
SalesAPI(app);
NotFoundAPI(app);




app.listen(config.port, () => {
    debug(`Server running on port ${config.port}`);
});