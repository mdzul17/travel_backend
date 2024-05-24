import { nanoid } from 'nanoid';
import {Pool} from 'pg'

class CategoryItemsService {
    private pool = new Pool();

    async getCategoryItems() {
        const query = {
            text: "SELECT * FROM category_items",
        }

        return await this.pool.query(query)
    }

    async getCategoryItemById(id: string) {
        const query = {
            text: "SELECT * FROM category_items WHERE id = $1",
            values: [id]
        }

        return await this.pool.query(query)
    }

    async addCategoryItem(payload: Record<string, any>) {
        const { name, image, country, city } = payload
        const id = `citem-${nanoid(8)}`
        const query = {
            text: "INSERT INTO category_items VALUES ($1, $2, $3, $4, $5) RETURNING id",
            values: [id, name, image, country, city]
        }

        return await this.pool.query(query)
    }

    async editCategoryItem(payload: Record<string, any>) {
        const { id, name, image, country, city } = payload

        const query = {
            text: "UPDATE category_items SET name = $1, image = $2, country = $3, city = $4 WHERE id = $5 RETURNING id",
            values: [name, image, country, city, id]
        }

        return await this.pool.query(query)
    }

    async deleteCategoryItem(id: string){
        const query = {
            text: "DELETE FROM category_items WHERE id = $1 RETURNING id",
            values: [id]
        }

        return await this.pool.query(query)
    }
}

export default CategoryItemsService