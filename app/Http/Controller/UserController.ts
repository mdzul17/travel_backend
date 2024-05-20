import { UsersService } from "../Service/UsersService.js";
import { HttpResponse as Response } from "../Utils/HttpResponse.js";
import express from 'express'

export const UserController = {
    getUsers: async(req: express.Request, res: express.Response) => {
        try {
            const users = await UsersService.getUsers();
            return Response.success(res, users.rows)
        } catch (error) {
            console.error(error)
            return Response.error(res, "Something went wrong")
        }
    },

    getUserById: async(req: express.Request, res: express.Response) => {
        try {
            const { id } = req.params
            const user = await UsersService.getUserById(id);

            if(!user.rows.length){
                return Response.notFound(res, "No user found")
            }

            return Response.success(res, user.rows)
        } catch (error) {
            console.error(error.message)
            return Response.error(res, "Something went wrong")
        }
    },

    addUser: async(req: express.Request, res: express.Response) => {
        try {
            const response = await UsersService.addUser(req.body)

            return Response.success(
                res,
                `User ID ${response.rows[0].id} successfully added`
            )
        } catch (error) {
            console.error(error)
            if(error.constraint == "users_username_key") {
                return Response.error(res, `Username already exists!`)
            }
            return Response.error(res, `Something went wrong`)
        }
    },

    editUser: async(req: express.Request, res: express.Response) => {
        try {
            const response = await UsersService.editUser({...req.params, ...req.body})

            if(!response.rows.length) {
                return Response.notFound(res, "No user found");
            }

            return Response.success(
                res,
                `User ID ${response.rows[0].id} successfully updated`
            )
        } catch (error) {
            console.error(error);
            return Response.error(res, `Something went wrong`)
        }
    },

    deleteUser: async(req: express.Request, res: express.Response) =>{
        try {
            const user = await UsersService.deleteUser(req.params.id)

            if(!user.rows.length){
                return Response.notFound(res,
                    `User failed to be deleted, ${req.params.id} is not found`
                )
            }

            return Response.success(res, `User successfully deleted`)
        } catch (error) {
            console.error(error)
            return Response.error(res, `Something went wrong`)
        }
    }
}