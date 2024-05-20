import express from "express";

const Router = express.Router();
import { UserController } from "app/Http/Controller/UserController.js";

Router.get("/", UserController.getUsers);
Router.get("/:id", UserController.getUserById)
Router.post("/", UserController.addUser)
Router.put("/:id", UserController.editUser)
Router.delete("/:id", UserController.deleteUser)


export default (): express.Router => {
    return Router
}