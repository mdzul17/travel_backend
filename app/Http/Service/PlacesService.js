const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const pool = new Pool();

module.exports = {
    getPlaces: async() => {
        const query = {
            text: 'SELECT * FROM places'
        }

        return await pool.query(query)
    },
    getPlaceById: async (id) => {
        const query = {
          text: "SELECT * FROM places whereid = $1",
          values: [id],
        };
    
        return await pool.query(query);
      },
      addPlace: async (payload) => {
        const { name, country, city, price, unit, isPopular, hasBackyard, description, imageUrl } = payload;
        const id = `place-${nanoid(16)}`;
        const query = {
          text: "INSERT INTO places VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id",
          values: [id, name, country, city, price, unit, isPopular, hasBackyard, description, imageUrl],
        };
    
        return await pool.query(query);
      },
      editPlace: async (payload) => {
        const { id, name, country, city, price, unit, isPopular, hasBackyard, description, imageUrl } = payload;
    
        const query = {
          text: "UPDATE places SET name = $1, country = $2, city = $3, price = $4, unit = $5, isPopular = $6, hasBackyard = $7, description = $8, imageUrl = $9 WHERE id = $10 RETURNING id",
          values: [name, country, city, price, unit, isPopular, hasBackyard, description, imageUrl, id],
        };
    
        return await pool.query(query);
      },
      deletePlace: async (id) => {
        const query = {
          text: "DELETE FROM places WHERE id = $1 RETURNING id",
          values: [id],
        };
    
        return await pool.query(query);
      },
}