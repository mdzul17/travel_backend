import { Pool } from 'pg'

class AuthenticationsService {
    private pool = new Pool();

    async getToken() {
        const query = {
            text: "SELECT token FROM authentications"
        }

        return await this.pool.query(query)
    }

    async updateToken(token: string) {
        const query = {
            text: "UPDATE authentications SET token = $1 RETURNING token",
            values: [token]
        }
    }

    async deleteToken(token: string) {
        const query = {
            text: "DELETE FROM authentications WHERE token = $1",
            values: [token]
        }
    }
}

export default AuthenticationsService