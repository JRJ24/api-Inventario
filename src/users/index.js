const express = require("express");
const router = express.Router();

const {UsersController} = require("./controllers");

module.exports.UsersAPI = (app) => {
    router
        .get("/", UsersController.getUsers) // http://localhost:3000/api/users/
        .get("/:id", UsersController.getUserById) // http://localhost:3000/api/users/:id
        .post("/create", UsersController.createUser) // http://localhost:3000/api/users/create
        .put("/update/:id", UsersController.updateUser) // http://localhost:3000/api/users/update
        .delete("/delete/:id", UsersController.deleteUser) // http://localhost:3000/api/users/delete

    app.use("/api/users", router)
}