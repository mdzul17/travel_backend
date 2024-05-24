import { nanoid } from 'nanoid';
import {Pool} from 'pg'
import bcrypt from 'bcrypt'

class CategoriesService {
    private pool = new Pool();

    async getCategories() {
        const query = {
            text: "SELECT * FROM categories",
        }

        return await this.pool.query(query)
    }

    async getCategoryById(id: string) {
        const query = {
            text: "SELECT * FROM categories WHERE id = $1",
            values: [id]
        }

        return await this.pool.query(query)
    }

    async addCategory(payload: Record<string, any>) {
        const { name } = payload
        const id = `categorie-${nanoid(8)}`
        const query = {
            text: "INSERT INTO categories VALUES ($1, $2) RETURNING id",
            values: [id, name]
        }

        return await this.pool.query(query)
    }

    async editCategory(payload: Record<string, any>) {
        const { name, id } = payload

        const query = {
            text: "UPDATE categories SET name = $1 WHERE id = $2 RETURNING id",
            values: [name, id]
        }

        return await this.pool.query(query)
    }

    async deleteCategory(id: string){
        const query = {
            text: "DELETE FROM categories WHERE id = $1 RETURNING id",
            values: [id]
        }

        return await this.pool.query(query)
    }
}

export default CategoriesService