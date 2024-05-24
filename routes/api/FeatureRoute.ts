import express from "express";

const Router = express.Router();
import FeatureController from "app/Http/Controller/FeatureController.js";
import FeaturesService from "app/Http/Service/FeaturesService.js";

const placesService = new FeaturesService()
const placeController = new FeatureController(placesService)

export default (): express.Router => {
    Router.get("/", placeController.getFeatures);
    Router.get("/:id", placeController.getFeatureById)
    Router.post("/", placeController.addFeature)
    Router.put("/:id", placeController.editFeature)
    Router.delete("/:id", placeController.deleteFeature)

    return Router
}