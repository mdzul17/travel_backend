import express from "express";
const Router = express.Router();

import UserController from "app/Http/Controller/UserController.js";
import UsersService from "app/Http/Service/UsersService.js";

const usersService = new UsersService()
const userController = new UserController(usersService)

export default (): express.Router => {
    Router.get("/", userController.getUsers);
    Router.get("/:id", userController.getUserById)
    Router.post("/", userController.addUser)
    Router.put("/:id", userController.editUser)
    Router.delete("/:id", userController.deleteUser)
    return Router
}