import { nanoid } from 'nanoid';
import {Pool} from 'pg'

class ActivitiesService {
    private pool = new Pool();

    async getActivities() {
        const query = {
            text: "SELECT * FROM activities",
        }

        return await this.pool.query(query)
    }

    async getActivityById(activity_id: string) {
        const query = {
            text: "SELECT * FROM activities WHERE activity_id = $1",
            values: [activity_id]
        }

        return await this.pool.query(query)
    }

    async addActivity(payload: Record<string, any>) {
        const { name, type, imageUrl } = payload
        const activity_id = `activity-${nanoid(8)}`
        const query = {
            text: "INSERT INTO activities VALUES ($1, $2, $3, $4) RETURNING activity_id",
            values: [activity_id, name, type, imageUrl]
        }

        return await this.pool.query(query)
    }

    async editActivity(payload: Record<string, any>) {
        const { name, type, imageUrl, activity_id } = payload

        const query = {
            text: "UPDATE activities SET name = $1, type = $2, imageUrl = $3 WHERE id = $4 RETURNING activity_id",
            values: [name, type, imageUrl, activity_id]
        }

        return await this.pool.query(query)
    }

    async deleteActivity(activity_id: string){
        const query = {
            text: "DELETE FROM activities WHERE activity_id = $1 RETURNING activity_id",
            values: [activity_id]
        }

        return await this.pool.query(query)
    }
}

export default ActivitiesService