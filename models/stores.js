const db = require('../db')
const ExpressError = require("../expressError");


class Store {
    static async all() {
        const results = await db.query(`
        SELECT * FROM stores WHERE open = $1`, [true]);
        return results.rows;
    }

    static async get(store_name) {
        const result = await db.query(`
        SELECT id, address, store_name, open, store_item, category, price
        FROM stores RIGHT JOIN store_items
        ON stores.id = store_items.store_id
        WHERE store_name = $1`, [store_name]);
        if (!result.rows) {
            throw new ExpressError(`No such user with email ${store_name}`)
        }
        console.log(`user: ${result}`)
        return result.rows
    }

    static async registerStore(store) {
        const {email, address, store_name, open="false"} = store;
        const postStore = await db.query(`
            INSERT INTO stores (
                email,
                address,
                store_name,
                open
            )
            VALUES ( $1, $2, $3, $4)
            RETURNING store_name
            `,[email, address, store_name, open]);
        return postStore.rows[0]
    }

    static async editStore(store) {
        const {email, address, store_name, id} = store;
        const postStore = await db.query(`
            UPDATE stores SET 
            email = $1,
            address = $2,
            store_name = $3
            WHERE id = $4
            RETURNING store_name
        `, [ email, address, store_name, id]);
        return postStore.rows[0]
    }

    static async deleteStore(store) {
        const deleteStore = await db.query(`
            DELETE FROM stores WHERE id = $1
        `,[store]);
        return "Successfully deleted";
    }
}

module.exports = Store