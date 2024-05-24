import { nanoid } from 'nanoid';
import {Pool} from 'pg'
import bcrypt from 'bcrypt'

class FeaturesService {
    private pool = new Pool();

    async getFeatures() {
        const query = {
            text: "SELECT * FROM features",
        }

        return await this.pool.query(query)
    }

    async getFeatureById(id: string) {
        const query = {
            text: "SELECT * FROM features WHERE id = $1",
            values: [id]
        }

        return await this.pool.query(query)
    }

    async addFeature(payload: Record<string, any>) {
        const { username, fullname, password, email, birthdate, phone_number, address, is_verified} = payload
        const id = `feature-${nanoid(8)}`
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = {
            text: "INSERT INTO features VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
            values: [id, username, birthdate, fullname, phone_number, address, is_verified, hashedPassword, email]
        }

        return await this.pool.query(query)
    }

    async editFeature(payload: Record<string, any>) {
        const { username, fullname, password, email, birthdate, phone_number, address } = payload

        const hashedPassword = await bcrypt.hash(password, 10)
        const query = {
            text: "UPDATE features SET username = $1, fullname = $2, password = $3, email = $4, birthdate = $5, phone_number = $6, address = $7 RETURNING id",
            values: [username, fullname, hashedPassword, email, birthdate, phone_number, address]
        }

        return await this.pool.query(query)
    }

    async deleteFeature(id: string){
        const query = {
            text: "DELETE FROM features WHERE id = $1 RETURNING id",
            values: [id]
        }

        return await this.pool.query(query)
    }
}

export default FeaturesService