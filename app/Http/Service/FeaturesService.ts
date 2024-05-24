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

    async getFeatureById(feature_id: string) {
        const query = {
            text: "SELECT * FROM features WHERE feature_id = $1",
            values: [feature_id]
        }

        return await this.pool.query(query)
    }

    async addFeature(payload: Record<string, any>) {
        const { username, fullname, password, email, birthdate, phone_number, address, is_verified} = payload
        const feature_id = `feature-${nanoid(8)}`
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = {
            text: "INSERT INTO features VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING feature_id",
            values: [feature_id, username, birthdate, fullname, phone_number, address, is_verified, hashedPassword, email]
        }

        return await this.pool.query(query)
    }

    async editFeature(payload: Record<string, any>) {
        const { username, fullname, password, email, birthdate, phone_number, address, feature_id } = payload

        const hashedPassword = await bcrypt.hash(password, 10)
        const query = {
            text: "UPDATE features SET username = $1, fullname = $2, password = $3, email = $4, birthdate = $5, phone_number = $6, address = $7 WHERE feature_id = $8 RETURNING feature_id",
            values: [username, fullname, hashedPassword, email, birthdate, phone_number, address, feature_id]
        }

        return await this.pool.query(query)
    }

    async deleteFeature(feature_id: string){
        const query = {
            text: "DELETE FROM features WHERE feature_id = $1 RETURNING feature_id",
            values: [feature_id]
        }

        return await this.pool.query(query)
    }
}

export default FeaturesService