import express from "express";

const Router = express.Router();
import CategoryItemController from "app/Http/Controller/CategoryItemController.js";
import CategoryItemsService from "app/Http/Service/CategoryItemsService.js";

const categoryItemsService = new CategoryItemsService()
const categoryItemController = new CategoryItemController(categoryItemsService)

export default (): express.Router => {
    Router.get("/", categoryItemController.getCategoryItems);
    Router.get("/:id", categoryItemController.getCategoryItemById)
    Router.post("/", categoryItemController.addCategoryItem)
    Router.put("/:id", categoryItemController.editCategoryItem)
    Router.delete("/:id", categoryItemController.deleteCategoryItem)

    return Router
}