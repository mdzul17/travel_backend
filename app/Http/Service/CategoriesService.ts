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

    async getCategoryById(category_id: string) {
        const query = {
            text: "SELECT * FROM categories WHERE category_id = $1",
            values: [category_id]
        }

        return await this.pool.query(query)
    }

    async addCategory(payload: Record<string, any>) {
        const { name } = payload
        const category_id = `categorie-${nanoid(8)}`
        const query = {
            text: "INSERT INTO categories VALUES ($1, $2) RETURNING category_id",
            values: [category_id, name]
        }

        return await this.pool.query(query)
    }

    async editCategory(payload: Record<string, any>) {
        const { name, category_id } = payload

        const query = {
            text: "UPDATE categories SET name = $1 WHERE category_id = $2 RETURNING category_id",
            values: [name, category_id]
        }

        return await this.pool.query(query)
    }

    async deleteCategory(category_id: string){
        const query = {
            text: "DELETE FROM categories WHERE category_id = $1 RETURNING category_id",
            values: [category_id]
        }

        return await this.pool.query(query)
    }
}

export default CategoriesService