import PlacesService from "../Service/PlacesService.js";
import HttpResponse from "../Utils/HttpResponse.js";
import express from 'express'

class PlaceController {
    private response = new HttpResponse()
    private _placesService = new PlacesService()

    constructor(PlacesService: PlacesService){
        this._placesService = PlacesService
    }

    async getPlaces(req: express.Request, res: express.Response) {
        try {
            const places = await this._placesService.getPlaces();
            return this.response.success(res, places.rows)
        } catch (error) {
            console.error(error)
            return this.response.error(res, "Something went wrong")
        }
    }

    async getPlaceById(req: express.Request, res: express.Response){
        try {
            const { id } = req.params
            const place = await this._placesService.getPlaceById(id);

            if(!place.rows.length){
                return this.response.notFound(res, "No place found")
            }

            return this.response.success(res, place.rows)
        } catch (error) {
            console.error(error.message)
            return this.response.error(res, "Something went wrong")
        }
    }

    async addPlace(req: express.Request, res: express.Response) {
        try {
            const response = await this._placesService.addPlace(req.body)

            return this.response.success(
                res,
                `Place ID ${response.rows[0].id} successfully added`
            )
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }

    async editPlace(req: express.Request, res: express.Response) {
        try {
            const response = await this._placesService.editPlace({...req.params, ...req.body})

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

    async deletePlace(req: express.Request, res: express.Response){
        try {
            const place = await this._placesService.deletePlace(req.params.id)

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

export default PlaceController