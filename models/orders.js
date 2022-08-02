const db = require('../db')
const ExpressError = require("../expressError");


class Order {
    static async all() {
        const results = await db.query(`
        SELECT * FROM orders`);
        return results.rows;
    }

    static async get(id) {
        const result = await db.query(`
        SELECT * FROM orders WHERE id = $1`, [id]);
        if (!result.rows[0]) {
            throw new ExpressError(`No such user with id ${id}`)
        }
        return result.rows[0]
    }

    static async createOrder(order) {
        const {customer_id, store_id, store_bill, store_tip, delivered_price, driver_tip, driver_id} = order
        const myOder = await db.query(`
        INSERT INTO orders (
            customer_id,
            store_id,
            store_bill,
            store_tip,
            delivered_price,
            driver_tip,
            date_,
            driver_id)
            VALUES (
                $1, $2, $3, $4, $5, $6, current_timestamp,$7
            )
            RETURNING ( id )
        `, [customer_id, store_id, store_bill, store_tip, delivered_price,driver_tip, driver_id]);
        return myOder.rows[0]
    }

    static async createOrdered_item(id, items) {
        const {item, quantity} = items
        console.log("here in create order")
        const postOrder = await db.query(`
        INSERT INTO ordered_items (
            order_id,
            item,
            quantity
        )
        VALUES (
            $1, $2, $3
        )
        RETURNING (item)
    `, [id, item, quantity]);
        return "Created"
    }
}

module.exports = Order