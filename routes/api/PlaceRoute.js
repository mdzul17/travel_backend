const Router = require("express").Router();
const PlaceController = require("../../app/Http/Controller/PlaceController")

Router.get("/", PlaceController.getPlaces);
Router.get("/:id", PlaceController.getPlaceById)
Router.post("/", PlaceController.addPlace)
Router.put("/:id", PlaceController.editPlace)
Router.delete("/:id", PlaceController.deletePlace)

module.exports = Router