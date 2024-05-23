import UsersService from "../Service/UsersService.js";
import HttpResponse from "../Utils/HttpResponse.js";
import express from 'express'

class UserController {
    private response = new HttpResponse();
    private _usersService = new UsersService()
    
    constructor(UsersService: UsersService) {
        this._usersService = UsersService
    }

    async getUsers(req: express.Request, res:express.Response){
        try {
            const users = await this._usersService.getUsers();
            return this.response.success(res, users.rows)
        } catch (error) {
            console.error(error)
            return this.response.error(res, "Something went wrong")
        }
    }

    async getUserById(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            const user = await this._usersService.getUserById(id);

            if(!user.rows.length){
                return this.response.notFound(res, "No user found")
            }

            return this.response.success(res, user.rows)
        } catch (error) {
            console.error(error.message)
            return this.response.error(res, "Something went wrong")
        }
    }

    async addUser(req: express.Request, res: express.Response) {
        try {
            const response = await this._usersService.addUser(req.body)

            return this.response.success(
                res,
                `User ID ${response.rows[0].id} successfully added`
            )
        } catch (error) {
            console.error(error)
            if(error.constraint == "users_username_key") {
                return this.response.error(res, `Username already exists!`)
            }
            return this.response.error(res, `Something went wrong`)
        }
    }

    async editUser(req: express.Request, res: express.Response) {
        try {
            const response = await this._usersService.editUser({...req.params, ...req.body})

            if(!response.rows.length) {
                return this.response.notFound(res, "No user found");
            }

            return this.response.success(
                res,
                `User ID ${response.rows[0].id} successfully updated`
            )
        } catch (error) {
            console.error(error);
            return this.response.error(res, `Something went wrong`)
        }
    }

    async deleteUser(req: express.Request, res: express.Response) {
        try {
            const user = await this._usersService.deleteUser(req.params.id)

            if(!user.rows.length){
                return this.response.notFound(res,
                    `User failed to be deleted, ${req.params.id} is not found`
                )
            }

            return this.response.success(res, `User successfully deleted`)
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }
}

export default UserController