import PlaceTypesService from "../Service/PlaceTypesService.js";
import HttpResponse from "../Utils/HttpResponse.js";
import express from 'express'

class PlaceTypeController {
    private response = new HttpResponse()
    private _placeTypesService = new PlaceTypesService()

    constructor(PlaceTypesService: PlaceTypesService){
        this._placeTypesService = PlaceTypesService
    }

    async getPlaceTypes(req: express.Request, res: express.Response) {
        try {
            const places = await this._placeTypesService.getPlaceTypes();
            return this.response.success(res, places.rows)
        } catch (error) {
            console.error(error)
            return this.response.error(res, "Something went wrong")
        }
    }

    async getPlaceTypeById(req: express.Request, res: express.Response){
        try {
            const { id } = req.params
            const place = await this._placeTypesService.getPlaceTypeById(id);

            if(!place.rows.length){
                return this.response.notFound(res, "No place found")
            }

            return this.response.success(res, place.rows)
        } catch (error) {
            console.error(error.message)
            return this.response.error(res, "Something went wrong")
        }
    }

    async addPlaceType(req: express.Request, res: express.Response) {
        try {
            const response = await this._placeTypesService.addPlaceType(req.body)

            return this.response.success(
                res,
                `Place ID ${response.rows[0].id} successfully added`
            )
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }

    async editPlaceType(req: express.Request, res: express.Response) {
        try {
            const response = await this._placeTypesService.editPlaceType({...req.params, ...req.body})

            if(!response.rows.length) {
                return this.response.notFound(res, "No place found");
            }

            return this.response.success(
                res,
                `Place ID ${response.rows[0].id} successfully updated`
            )
        } catch (error) {
            console.error(error);
            return this.response.error(res, `Something went wrong`)
        }
    }

    async deletePlaceType(req: express.Request, res: express.Response){
        try {
            const place = await this._placeTypesService.deletePlaceType(req.params.id)

            if(!place.rows.length){
                return this.response.notFound(res,
                    `Place failed to be deleted, ${req.params.id} is not found`
                )
            }

            return this.response.success(res, `Place successfully deleted`)
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }
}

export default PlaceTypeController