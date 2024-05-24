import express from "express";

const Router = express.Router();
import FeatureController from "app/Http/Controller/FeatureController.js";
import FeaturesService from "app/Http/Service/FeaturesService.js";

const featuresService = new FeaturesService()
const featureController = new FeatureController(featuresService)

export default (): express.Router => {
    Router.get("/", featureController.getFeatures);
    Router.get("/:id", featureController.getFeatureById)
    Router.post("/", featureController.addFeature)
    Router.put("/:id", featureController.editFeature)
    Router.delete("/:id", featureController.deleteFeature)

    return Router
}