import { nanoid } from 'nanoid';
import {Pool} from 'pg'
import bcrypt from 'bcrypt'

class UsersService {
    private pool = new Pool();

    async getUsers() {
        const query = {
            text: "SELECT * FROM users",
        }

        return await this.pool.query(query)
    }

    async getUserById(id: string) {
        const query = {
            text: "SELECT * FROM users WHERE id = $1",
            values: [id]
        }

        return await this.pool.query(query)
    }

    async addUser(payload: Record<string, any>) {
        const { username, fullname, password, email, birthdate, phone_number, address, is_verified} = payload
        const id = `user-${nanoid(8)}`
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = {
            text: "INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
            values: [id, username, birthdate, fullname, phone_number, address, is_verified, hashedPassword, email]
        }

        return await this.pool.query(query)
    }

    async editUser(payload: Record<string, any>) {
        const { username, fullname, password, email, birthdate, phone_number, address } = payload

        const hashedPassword = await bcrypt.hash(password, 10)
        const query = {
            text: "UPDATE users SET username = $1, fullname = $2, password = $3, email = $4, birthdate = $5, phone_number = $6, address = $7 RETURNING id",
            values: [username, fullname, hashedPassword, email, birthdate, phone_number, address]
        }

        return await this.pool.query(query)
    }

    async deleteUser(id: string){
        const query = {
            text: "DELETE FROM users WHERE id = $1 RETURNING id",
            values: [id]
        }

        return await this.pool.query(query)
    }

    async getUserByUsername(username: string) {
        const query = {
            text: "SELECT username FROM users WHERE username = $1",
            values: [username]
        }

        return await this.pool.query(query)
    }

    async validatePassword(password: string){
        const query = {
            text: "SELECT password FROM users WHERE password = $1",
            values: [password]
        }

        return await this.pool.query(query)
    }
}

export default UsersService