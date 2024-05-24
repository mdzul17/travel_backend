import ActivitiesService from "../Service/ActivitiesService.js";
import HttpResponse from "../Utils/HttpResponse.js";
import express from 'express'

class ActivityController {
    private response = new HttpResponse()
    private _placesService = new ActivitiesService()

    constructor(ActivitiesService: ActivitiesService){
        this._placesService = ActivitiesService
    }

    async getActivities(req: express.Request, res: express.Response) {
        try {
            const places = await this._placesService.getActivities();
            return this.response.success(res, places.rows)
        } catch (error) {
            console.error(error)
            return this.response.error(res, "Something went wrong")
        }
    }

    async getActivityById(req: express.Request, res: express.Response){
        try {
            const { id } = req.params
            const user = await this._placesService.getActivityById(id);

            if(!user.rows.length){
                return this.response.notFound(res, "No user found")
            }

            return this.response.success(res, user.rows)
        } catch (error) {
            console.error(error.message)
            return this.response.error(res, "Something went wrong")
        }
    }

    async addActivity(req: express.Request, res: express.Response) {
        try {
            const response = await this._placesService.addActivity(req.body)

            return this.response.success(
                res,
                `Activity ID ${response.rows[0].id} successfully added`
            )
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }

    async editActivity(req: express.Request, res: express.Response) {
        try {
            const response = await this._placesService.editActivity({...req.params, ...req.body})

            if(!response.rows.length) {
                return this.response.notFound(res, "No user found");
            }

            return this.response.success(
                res,
                `Activity ID ${response.rows[0].id} successfully updated`
            )
        } catch (error) {
            console.error(error);
            return this.response.error(res, `Something went wrong`)
        }
    }

    async deleteActivity(req: express.Request, res: express.Response){
        try {
            const user = await this._placesService.deleteActivity(req.params.id)

            if(!user.rows.length){
                return this.response.notFound(res,
                    `Activity failed to be deleted, ${req.params.id} is not found`
                )
            }

            return this.response.success(res, `Activity successfully deleted`)
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }
}

export default ActivityController