const Router = require("express").Router();
const UserController = require("../../app/Http/Controller/UserController")

Router.get("/", UserController.getUsers);
Router.get("/:id", UserController.getUserById)
Router.post("/", UserController.addUser)
Router.put("/:id", UserController.editUser)
Router.delete("/:id", UserController.deleteUser)

module.exports = Router