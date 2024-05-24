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

    async getCategoryItemById(citem_id: string) {
        const query = {
            text: "SELECT * FROM category_items WHERE id = $1",
            values: [citem_id]
        }

        return await this.pool.query(query)
    }

    async addCategoryItem(payload: Record<string, any>) {
        const { name, image, country, city } = payload
        const citem_id = `citem-${nanoid(8)}`
        const query = {
            text: "INSERT INTO category_items VALUES ($1, $2, $3, $4, $5) RETURNING citem_id",
            values: [citem_id, name, image, country, city]
        }

        return await this.pool.query(query)
    }

    async editCategoryItem(payload: Record<string, any>) {
        const { citem_id, name, image, country, city } = payload

        const query = {
            text: "UPDATE category_items SET name = $1, image = $2, country = $3, city = $4 WHERE citem_id = $5 RETURNING citem_id",
            values: [name, image, country, city, citem_id]
        }

        return await this.pool.query(query)
    }

    async deleteCategoryItem(citem_id: string){
        const query = {
            text: "DELETE FROM category_items WHERE citem_id = $1 RETURNING citem_id",
            values: [citem_id]
        }

        return await this.pool.query(query)
    }
}

export default CategoryItemsService