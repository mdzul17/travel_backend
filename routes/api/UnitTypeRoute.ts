import express from "express";
import UnitTypeController from "app/Http/Controller/UnitTypeController.js";
import UnitTypesService from "app/Http/Service/UnitTypesService.js";

const Router = express.Router();

const unitTypesService = new UnitTypesService()
const unitTypeController = new UnitTypeController(unitTypesService)

export default (): express.Router => {
    Router.get("/", unitTypeController.getUnitTypes);
    Router.get("/:id", unitTypeController.getUnitTypeById)
    Router.post("/", unitTypeController.addUnitType)
    Router.put("/:id", unitTypeController.editUnitType)
    Router.delete("/:id", unitTypeController.deleteUnitType)

    return Router
}