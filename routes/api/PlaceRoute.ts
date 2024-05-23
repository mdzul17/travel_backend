import express from "express";

const Router = express.Router();
import PlaceController from "app/Http/Controller/PlaceController.js";
import PlacesService from "app/Http/Service/PlacesService.js";

const placesService = new PlacesService()
const placeController = new PlaceController(placesService)

export default (): express.Router => {
    Router.get("/", placeController.getPlaces);
    Router.get("/:id", placeController.getPlaceById)
    Router.post("/", placeController.addPlace)
    Router.put("/:id", placeController.editPlace)
    Router.delete("/:id", placeController.deletePlace)

    return Router
}