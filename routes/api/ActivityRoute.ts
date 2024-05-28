import express from "express";

const Router = express.Router();
import ActivityController from "app/Http/Controller/ActivityController.js";
import ActivitiesService from "app/Http/Service/ActivitiesService.js";

const activitiesService = new ActivitiesService()
const activityController = new ActivityController(activitiesService)

export default (): express.Router => {
    Router.get("/", activityController.getActivities);
    Router.get("/:id", activityController.getActivityById)
    Router.post("/", activityController.addActivity)
    Router.put("/:id", activityController.editActivity)
    Router.delete("/:id", activityController.deleteActivity)

    return Router
}