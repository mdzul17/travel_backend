import express from "express";

const Router = express.Router();
import { PlaceController } from "app/Http/Controller/PlaceController.js";

Router.get("/", PlaceController.getPlaces);
Router.get("/:id", PlaceController.getPlaceById)
Router.post("/", PlaceController.addPlace)
Router.put("/:id", PlaceController.editPlace)
Router.delete("/:id", PlaceController.deletePlace)

export default (): express.Router => {
    return Router
}