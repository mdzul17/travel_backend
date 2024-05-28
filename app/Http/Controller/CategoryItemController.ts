import CategoryItemsService from "../Service/CategoryItemsService.js";
import HttpResponse from "../Utils/HttpResponse.js";
import express from 'express'

class CategoryItemController {
    private response = new HttpResponse();
    private _categoryItemsService = new CategoryItemsService()
    
    constructor(CategoryItemsService: CategoryItemsService) {
        this._categoryItemsService = CategoryItemsService
    }

    async getCategoryItems(req: express.Request, res:express.Response){
        try {
            const categoryItems = await this._categoryItemsService.getCategoryItems();
            return this.response.success(res, categoryItems.rows)
        } catch (error) {
            console.error(error)
            return this.response.error(res, "Something went wrong")
        }
    }

    async getCategoryItemById(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            const category = await this._categoryItemsService.getCategoryItemById(id);

            if(!category.rows.length){
                return this.response.notFound(res, "No category item found")
            }

            return this.response.success(res, category.rows)
        } catch (error) {
            console.error(error.message)
            return this.response.error(res, "Something went wrong")
        }
    }

    async addCategoryItem(req: express.Request, res: express.Response) {
        try {
            const response = await this._categoryItemsService.addCategoryItem(req.body)

            return this.response.success(
                res,
                `CategoryItem ID ${response.rows[0].id} successfully added`
            )
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }

    async editCategoryItem(req: express.Request, res: express.Response) {
        try {
            const response = await this._categoryItemsService.editCategoryItem({...req.params, ...req.body})

            if(!response.rows.length) {
                return this.response.notFound(res, "No category found");
            }

            return this.response.success(
                res,
                `CategoryItem ID ${response.rows[0].id} successfully updated`
            )
        } catch (error) {
            console.error(error);
            return this.response.error(res, `Something went wrong`)
        }
    }

    async deleteCategoryItem(req: express.Request, res: express.Response) {
        try {
            const category = await this._categoryItemsService.deleteCategoryItem(req.params.id)

            if(!category.rows.length){
                return this.response.notFound(res,
                    `CategoryItem failed to be deleted, ${req.params.id} is not found`
                )
            }

            return this.response.success(res, `CategoryItem successfully deleted`)
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }
}

export default CategoryItemController