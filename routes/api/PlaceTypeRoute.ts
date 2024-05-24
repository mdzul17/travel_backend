import express from "express";

const Router = express.Router();
import PlaceTypeController from "app/Http/Controller/PlaceTypeController.js";
import PlaceTypesService from "app/Http/Service/PlaceTypesService.js";

const placeTypesService = new PlaceTypesService()
const placeTypeController = new PlaceTypeController(placeTypesService)

export default (): express.Router => {
    Router.get("/", placeTypeController.getPlaceTypes);
    Router.get("/:id", placeTypeController.getPlaceTypeById)
    Router.post("/", placeTypeController.addPlaceType)
    Router.put("/:id", placeTypeController.editPlaceType)
    Router.delete("/:id", placeTypeController.deletePlaceType)

    return Router
}