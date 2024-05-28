import FeaturesService from "../Service/FeaturesService.js";
import HttpResponse from "../Utils/HttpResponse.js";
import express from 'express'

class FeatureController {
    private response = new HttpResponse()
    private _featuresService = new FeaturesService()

    constructor(FeaturesService: FeaturesService){
        this._featuresService = FeaturesService
    }

    async getFeatures(req: express.Request, res: express.Response) {
        try {
            const features = await this._featuresService.getFeatures();
            return this.response.success(res, features.rows)
        } catch (error) {
            console.error(error)
            return this.response.error(res, "Something went wrong")
        }
    }

    async getFeatureById(req: express.Request, res: express.Response){
        try {
            const { id } = req.params
            const feature = await this._featuresService.getFeatureById(id);

            if(!feature.rows.length){
                return this.response.notFound(res, "No feature found")
            }

            return this.response.success(res, feature.rows)
        } catch (error) {
            console.error(error.message)
            return this.response.error(res, "Something went wrong")
        }
    }

    async addFeature(req: express.Request, res: express.Response) {
        try {
            const response = await this._featuresService.addFeature(req.body)

            return this.response.success(
                res,
                `Feature ID ${response.rows[0].id} successfully added`
            )
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }

    async editFeature(req: express.Request, res: express.Response) {
        try {
            const response = await this._featuresService.editFeature({...req.params, ...req.body})

            if(!response.rows.length) {
                return this.response.notFound(res, "No feature found");
            }

            return this.response.success(
                res,
                `Feature ID ${response.rows[0].id} successfully updated`
            )
        } catch (error) {
            console.error(error);
            return this.response.error(res, `Something went wrong`)
        }
    }

    async deleteFeature(req: express.Request, res: express.Response){
        try {
            const feature = await this._featuresService.deleteFeature(req.params.id)

            if(!feature.rows.length){
                return this.response.notFound(res,
                    `Feature failed to be deleted, ${req.params.id} is not found`
                )
            }

            return this.response.success(res, `Feature successfully deleted`)
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }
}

export default FeatureController