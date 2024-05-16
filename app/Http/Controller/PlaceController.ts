import { PlacesService } from "../Service/PlacesService.js";
import { HttpResponse as Response } from "../Utils/HttpResponse.js";
import express from 'express'

export const PlaceController = {
    getPlaces: async(req: express.Request, res: express.Response) => {
        try {
            const places = await PlacesService.getPlaces();
            return Response.success(res, places.rows)
        } catch (error) {
            console.error(error)
            return Response.error(res, "Something went wrong")
        }
    },

    getPlaceById: async(req: express.Request, res: express.Response) => {
        try {
            const { id } = req.params
            const user = await PlacesService.getPlaceById(id);

            if(!user.rows.length){
                return Response.notFound(res, "No user found")
            }

            return Response.success(res, user.rows)
        } catch (error) {
            console.error(error.message)
            return Response.error(res, "Something went wrong")
        }
    },

    addPlace: async(req: express.Request, res: express.Response) => {
        try {
            const response = await PlacesService.addPlace(req.body)

            return Response.success(
                res,
                `Place ID ${response.rows[0].id} successfully added`
            )
        } catch (error) {
            console.error(error)
            if(error.constraint == "places_username_key") {
                return Response.error(res, `Placename already exists!`)
            }
            return Response.error(res, `Something went wrong`)
        }
    },

    editPlace: async(req: express.Request, res: express.Response) => {
        try {
            const response = await PlacesService.editPlace({...req.params, ...req.body})

            if(!response.rows.length) {
                return Response.notFound(res, "No user found");
            }

            return Response.success(
                res,
                `Place ID ${response.rows[0].id} successfully updated`
            )
        } catch (error) {
            console.error(error);
            return Response.error(res, `Something went wrong`)
        }
    },

    deletePlace: async(req: express.Request, res: express.Response) =>{
        try {
            const user = await PlacesService.deletePlace(req.params.id)

            if(!user.rows.length){
                return Response.notFound(res,
                    `Place failed to be deleted, ${req.params.id} is not found`
                )
            }

            return Response.success(res, `Place successfully deleted`)
        } catch (error) {
            console.error(error)
            return Response.error(res, `Something went wrong`)
        }
    }
}