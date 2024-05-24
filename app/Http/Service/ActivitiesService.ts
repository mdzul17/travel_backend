import { nanoid } from 'nanoid';
import {Pool} from 'pg'
import bcrypt from 'bcrypt'

class ActivitiesService {
    private pool = new Pool();

    async getActivities() {
        const query = {
            text: "SELECT * FROM activities",
        }

        return await this.pool.query(query)
    }

    async getActivityById(id: string) {
        const query = {
            text: "SELECT * FROM activities WHERE id = $1",
            values: [id]
        }

        return await this.pool.query(query)
    }

    async addActivity(payload: Record<string, any>) {
        const { name, type, imageUrl } = payload
        const id = `activity-${nanoid(8)}`
        const query = {
            text: "INSERT INTO activities VALUES ($1, $2, $3, $4) RETURNING id",
            values: [id, name, type, imageUrl]
        }

        return await this.pool.query(query)
    }

    async editActivity(payload: Record<string, any>) {
        const { name, type, imageUrl, id } = payload

        const query = {
            text: "UPDATE activities SET name = $1, type = $2, imageUrl = $3 WHERE id = $4 RETURNING id",
            values: [name, type, imageUrl, id]
        }

        return await this.pool.query(query)
    }

    async deleteActivity(id: string){
        const query = {
            text: "DELETE FROM activities WHERE id = $1 RETURNING id",
            values: [id]
        }

        return await this.pool.query(query)
    }
}

export default ActivitiesService