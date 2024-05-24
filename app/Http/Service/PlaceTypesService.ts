import { nanoid } from 'nanoid';
import {Pool} from 'pg'


export default class PlaceTypesService {
  private pool = new Pool();
    async getPlaceTypes(){
        const query = {
            text: 'SELECT * FROM place_types'
        }

        return await this.pool.query(query)
    }

    async getPlaceTypeById(id: string) {
        const query = {
          text: "SELECT * FROM place_types where id = $1",
          values: [id],
        };
    
        return await this.pool.query(query);
      }

      async addPlaceType(payload: Record<string, any>) {
        const { type_name } = payload;
        const id = `place-${nanoid(16)}`;
        const query = {
          text: "INSERT INTO place_types VALUES($1, $2) RETURNING id",
          values: [id, type_name],
        };
    
        return await this.pool.query(query);
      }
      async editPlaceType(payload: Record<string, any>) {
        const { id, type_name } = payload;
    
        const query = {
          text: "UPDATE place_types SET type_name = $1 WHERE id = $2 RETURNING id",
          values: [type_name, id],
        };
    
        return await this.pool.query(query);
      }
      async deletePlaceType(id: string) {
        const query = {
          text: "DELETE FROM place_types WHERE id = $1 RETURNING id",
          values: [id],
        };
    
        return await this.pool.query(query);
      }
}