import { nanoid } from 'nanoid';
import {Pool} from 'pg'


export default class UnitTypesService {
  private pool = new Pool();
    async getUnitTypes(){
        const query = {
            text: 'SELECT * FROM unit_types'
        }

        return await this.pool.query(query)
    }

    async getUnitTypeById(utype_id: string) {
        const query = {
          text: "SELECT * FROM unit_types where utype_id = $1",
          values: [utype_id],
        };
    
        return await this.pool.query(query);
      }

      async addUnitType(payload: Record<string, any>) {
        const { type_name } = payload;
        const utype_id = `utype-${nanoid(16)}`;
        const query = {
          text: "INSERT INTO unit_types VALUES($1, $2) RETURNING utype_id",
          values: [utype_id, type_name],
        };
    
        return await this.pool.query(query);
      }
      async editUnitType(payload: Record<string, any>) {
        const { utype_id, type_name } = payload;
    
        const query = {
          text: "UPDATE unit_types SET type_name = $1 WHERE utype_id = $2 RETURNING utype_id",
          values: [type_name, utype_id],
        };
    
        return await this.pool.query(query);
      }
      async deleteUnitType(utype_id: string) {
        const query = {
          text: "DELETE FROM unit_types WHERE utype_id = $1 RETURNING utype_id",
          values: [utype_id],
        };
    
        return await this.pool.query(query);
      }
}