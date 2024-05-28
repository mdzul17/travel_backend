import UnitTypesService from "../Service/UnitTypesService.js";
import HttpResponse from "../Utils/HttpResponse.js";
import express from 'express'

class UnitTypeController {
    private response = new HttpResponse()
    private _unitTypesService = new UnitTypesService()

    constructor(UnitTypesService: UnitTypesService){
        this._unitTypesService = UnitTypesService
    }

    async getUnitTypes(req: express.Request, res: express.Response) {
        try {
            const units = await this._unitTypesService.getUnitTypes();
            return this.response.success(res, units.rows)
        } catch (error) {
            console.error(error)
            return this.response.error(res, "Something went wrong")
        }
    }

    async getUnitTypeById(req: express.Request, res: express.Response){
        try {
            const { id } = req.params
            const unit = await this._unitTypesService.getUnitTypeById(id);

            if(!unit.rows.length){
                return this.response.notFound(res, "No unit found")
            }

            return this.response.success(res, unit.rows)
        } catch (error) {
            console.error(error.message)
            return this.response.error(res, "Something went wrong")
        }
    }

    async addUnitType(req: express.Request, res: express.Response) {
        try {
            const response = await this._unitTypesService.addUnitType(req.body)

            return this.response.success(
                res,
                `Unit ID ${response.rows[0].id} successfully added`
            )
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }

    async editUnitType(req: express.Request, res: express.Response) {
        try {
            const response = await this._unitTypesService.editUnitType({...req.params, ...req.body})

            if(!response.rows.length) {
                return this.response.notFound(res, "No unit found");
            }

            return this.response.success(
                res,
                `Unit ID ${response.rows[0].id} successfully updated`
            )
        } catch (error) {
            console.error(error);
            return this.response.error(res, `Something went wrong`)
        }
    }

    async deleteUnitType(req: express.Request, res: express.Response){
        try {
            const unit = await this._unitTypesService.deleteUnitType(req.params.id)

            if(!unit.rows.length){
                return this.response.notFound(res,
                    `Unit failed to be deleted, ${req.params.id} is not found`
                )
            }

            return this.response.success(res, `Unit successfully deleted`)
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }
}

export default UnitTypeController