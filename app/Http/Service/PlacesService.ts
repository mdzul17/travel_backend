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

    async getPlaceById(place_id: string) {
        const query = {
          text: "SELECT * FROM places where place_id = $1",
          values: [place_id],
        };
    
        return await this.pool.query(query);
      }

      async addPlace(payload: Record<string, any>) {
        const { name, country, city, price, unit, isPopular, hasBackyard, description, imageUrl } = payload;
        const place_id = `place-${nanoid(16)}`;
        const query = {
          text: "INSERT INTO places VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING place_id",
          values: [place_id, name, country, city, price, unit, isPopular, hasBackyard, description, imageUrl],
        };
    
        return await this.pool.query(query);
      }
      async editPlace(payload: Record<string, any>) {
        const { place_id, name, country, city, price, unit, isPopular, hasBackyard, description, imageUrl } = payload;
    
        const query = {
          text: "UPDATE places SET name = $1, country = $2, city = $3, price = $4, unit = $5, isPopular = $6, hasBackyard = $7, description = $8, imageUrl = $9 WHERE place_id = $10 RETURNING place_id",
          values: [name, country, city, price, unit, isPopular, hasBackyard, description, imageUrl, place_id],
        };
    
        return await this.pool.query(query);
      }
      async deletePlace(place_id: string) {
        const query = {
          text: "DELETE FROM places WHERE place_id = $1 RETURNING place_id",
          values: [place_id],
        };
    
        return await this.pool.query(query);
      }
}