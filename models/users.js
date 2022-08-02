const db = require('../db')
const ExpressError = require("../expressError");


class User {
    static async all() {
        const results = await db.query(`
        SELECT * FROM users ORDER BY  first_name`);
        return results.rows;
    }

    static async get(id) {
        console.log(id)
        const result = await db.query(`
        SELECT * FROM users WHERE id = $1`, [id]);
        if (!result.rows[0]) {
            throw new ExpressError(`No such user with id ${id}`)
        }
        console.log(`user: ${result}`)
        return result.rows[0]
    }

    static async registerUser(user) {
        const {first_name, last_name, phone, email, password, role="customer", address} = user;
        console.log(first_name, last_name, phone, email, password, role, address)
        const postUser = await db.query(`
            INSERT INTO users (
                first_name,
                last_name,
                phone,
                email,
                password,
                role,
                address
            )
            VALUES ( $1, $2, $3, $4, $5, $6, $7)
            RETURNING first_name
            `,[first_name, last_name, phone, email, password, role, address]);
        return postUser.rows[0]
    }

    static async editUser(user) {
        const {first_name, last_name, phone, email, password, address, id} = user;
        const postUser = await db.query(`
            UPDATE users SET 
            first_name = $1,
            last_name = $2,
            phone = $3,
            email = $4,
            address = $5
            WHERE id = $6
            RETURNING first_name
        `, [first_name, last_name, phone, email, address, id]);
        return postUser.rows[0]
    }

    static async deleteUser(user) {
        console.log(user)
        const deleteUser = await db.query(`
            DELETE FROM users WHERE id = $1
        `,[user]);
        return "Successfully deleted";
    }
}

module.exports = User