import express from "express";

const Router = express.Router();
import ActivityController from "app/Http/Controller/ActivityController.js";
import ActivitiesService from "app/Http/Service/ActivitiesService.js";

const placesService = new ActivitiesService()
const placeController = new ActivityController(placesService)

export default (): express.Router => {
    Router.get("/", placeController.getActivities);
    Router.get("/:id", placeController.getActivityById)
    Router.post("/", placeController.addActivity)
    Router.put("/:id", placeController.editActivity)
    Router.delete("/:id", placeController.deleteActivity)

    return Router
}