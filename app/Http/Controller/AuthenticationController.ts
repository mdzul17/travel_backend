import AuthenticationsService from "../Service/AuthenticationsService.js";
import UsersService from "../Service/UsersService.js";
import HttpResponse from "../Utils/HttpResponse.js";
import express from "express"
import bcrypt from "bcrypt"

class AuthenticationController {
    private httpResponse = new HttpResponse()
    private _authenticationsService = new AuthenticationsService()
    private _usersService = new UsersService()

    constructor(
        AuthenticationsService: AuthenticationsService,
        UsersService: UsersService
    ) {
        this._authenticationsService = AuthenticationsService
        this._usersService = UsersService
    }

    async login(req: express.Request, res: express.Response) {
        try {
            const { username, password } = req.body
            const checkUsername = await this._usersService.getUserByUsername(username);
            
            if(!checkUsername.rows.length) {
                return this.httpResponse.unauthorizedError(res, "Unauthorized")
            }
            
            const checkPassword = await this._usersService.validatePassword(password)
            const isMatch = await bcrypt.compare(password, checkPassword.rows[0].password)

        } catch (error) {
            return this.httpResponse.error(res, "Something went wrong!")
        }
    }
}

export default AuthenticationController;