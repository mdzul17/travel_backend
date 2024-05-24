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

    async getPlaceTypeById(ptype_id: string) {
        const query = {
          text: "SELECT * FROM place_types where ptype_id = $1",
          values: [ptype_id],
        };
    
        return await this.pool.query(query);
      }

      async addPlaceType(payload: Record<string, any>) {
        const { type_name } = payload;
        const ptype_id = `ptype-${nanoid(16)}`;
        const query = {
          text: "INSERT INTO place_types VALUES($1, $2) RETURNING ptype_id",
          values: [ptype_id, type_name],
        };
    
        return await this.pool.query(query);
      }
      async editPlaceType(payload: Record<string, any>) {
        const { ptype_id, type_name } = payload;
    
        const query = {
          text: "UPDATE place_types SET type_name = $1 WHERE ptype_id = $2 RETURNING ptype_id",
          values: [type_name, ptype_id],
        };
    
        return await this.pool.query(query);
      }
      async deletePlaceType(ptype_id: string) {
        const query = {
          text: "DELETE FROM place_types WHERE ptype_id = $1 RETURNING ptype_id",
          values: [ptype_id],
        };
    
        return await this.pool.query(query);
      }
}