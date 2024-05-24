import { nanoid } from 'nanoid';
import {Pool} from 'pg'


export default class PlacesService {
  private pool = new Pool();
    async getPlaces(){
        const query = {
            text: 'SELECT * FROM places'
        }

        return await this.pool.query(query)
    }

    async getPlaceById(id: string) {
        const query = {
          text: "SELECT * FROM places where id = $1",
          values: [id],
        };
    
        return await this.pool.query(query);
      }

      async addPlace(payload: Record<string, any>) {
        const { name, country, city, price, unit, isPopular, hasBackyard, description, imageUrl } = payload;
        const id = `place-${nanoid(16)}`;
        const query = {
          text: "INSERT INTO places VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id",
          values: [id, name, country, city, price, unit, isPopular, hasBackyard, description, imageUrl],
        };
    
        return await this.pool.query(query);
      }
      async editPlace(payload: Record<string, any>) {
        const { id, name, country, city, price, unit, isPopular, hasBackyard, description, imageUrl } = payload;
    
        const query = {
          text: "UPDATE places SET name = $1, country = $2, city = $3, price = $4, unit = $5, isPopular = $6, hasBackyard = $7, description = $8, imageUrl = $9 WHERE id = $10 RETURNING id",
          values: [name, country, city, price, unit, isPopular, hasBackyard, description, imageUrl, id],
        };
    
        return await this.pool.query(query);
      }
      async deletePlace(id: string) {
        const query = {
          text: "DELETE FROM places WHERE id = $1 RETURNING id",
          values: [id],
        };
    
        return await this.pool.query(query);
      }
}