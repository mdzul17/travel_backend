import express from "express";
const Router = express.Router();

import CategoryController from "app/Http/Controller/CategoryController.js";
import CategoriesService from "app/Http/Service/CategoriesService.js";

const categoriesService = new CategoriesService()
const categoryController = new CategoryController(categoriesService)

export default (): express.Router => {
    Router.get("/", categoryController.getCategories);
    Router.get("/:id", categoryController.getCategoryById)
    Router.post("/", categoryController.addCategory)
    Router.put("/:id", categoryController.editCategory)
    Router.delete("/:id", categoryController.deleteCategory)
    return Router
}