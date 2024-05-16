const { nanoid } = require("nanoid")
const { Pool } = require("pg")
const bcrypt = require("bcrypt")
const pool = new Pool();

module.exports = {
    getUsers: async() => {
        const query = {
            text: "SELECT * FROM users",
        }

        return await pool.query(query)
    },

    getUserById: async(id) => {
        const query = {
            text: "SELECT * FROM users WHERE id = $1",
            values: [id]
        }

        return await pool.query(query)
    },

    addUser: async(payload) => {
        const { username, fullname, password, email, birthdate, phone_number, address, is_verified} = payload
        const id = `user-${nanoid(8)}`
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = {
            text: "INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
            values: [id, username, birthdate, fullname, phone_number, address, is_verified, hashedPassword, email]
        }

        return await pool.query(query)
    },

    editUser: async(payload) => {
        const { username, fullname, password, email, birthdate, phone_number, address } = payload

        const hashedPassword = await bcrypt.hash(password, 10)
        const query = {
            text: "UPDATE users SET username = $1, fullname = $2, password = $3, email = $4, birthdate = $5, phone_number = $6, address = $7 RETURNING id",
            values: [username, fullname, hashedPassword, email, birthdate, phone_number, address]
        }

        return await pool.query(query)
    },

    deleteUser: async(id) => {
        const query = {
            text: "DELETE FROM users WHERE id = $1 RETURNING id",
            values: id
        }

        return await pool.query(query)
    }
}