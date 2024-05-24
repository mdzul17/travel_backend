import CategoriesService from "../Service/CategoriesService.js";
import HttpResponse from "../Utils/HttpResponse.js";
import express from 'express'

class CategoryController {
    private response = new HttpResponse();
    private _categoriesService = new CategoriesService()
    
    constructor(CategoriesService: CategoriesService) {
        this._categoriesService = CategoriesService
    }

    async getCategories(req: express.Request, res:express.Response){
        try {
            const categories = await this._categoriesService.getCategories();
            return this.response.success(res, categories.rows)
        } catch (error) {
            console.error(error)
            return this.response.error(res, "Something went wrong")
        }
    }

    async getCategoryById(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            const category = await this._categoriesService.getCategoryById(id);

            if(!category.rows.length){
                return this.response.notFound(res, "No category found")
            }

            return this.response.success(res, category.rows)
        } catch (error) {
            console.error(error.message)
            return this.response.error(res, "Something went wrong")
        }
    }

    async addCategory(req: express.Request, res: express.Response) {
        try {
            const response = await this._categoriesService.addCategory(req.body)

            return this.response.success(
                res,
                `Category ID ${response.rows[0].id} successfully added`
            )
        } catch (error) {
            console.error(error)
            if(error.constraint == "categories_categoryname_key") {
                return this.response.error(res, `Categoryname already exists!`)
            }
            return this.response.error(res, `Something went wrong`)
        }
    }

    async editCategory(req: express.Request, res: express.Response) {
        try {
            const response = await this._categoriesService.editCategory({...req.params, ...req.body})

            if(!response.rows.length) {
                return this.response.notFound(res, "No category found");
            }

            return this.response.success(
                res,
                `Category ID ${response.rows[0].id} successfully updated`
            )
        } catch (error) {
            console.error(error);
            return this.response.error(res, `Something went wrong`)
        }
    }

    async deleteCategory(req: express.Request, res: express.Response) {
        try {
            const category = await this._categoriesService.deleteCategory(req.params.id)

            if(!category.rows.length){
                return this.response.notFound(res,
                    `Category failed to be deleted, ${req.params.id} is not found`
                )
            }

            return this.response.success(res, `Category successfully deleted`)
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }
}

export default CategoryController