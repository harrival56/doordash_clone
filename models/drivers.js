const db = require('../db')
const ExpressError = require("../expressError");


class Driver {
    static async all() {
        const results = await db.query(`
        SELECT * FROM drivers WHERE online = $1`, [true]);
        return results.rows;
    }

    static async get(email) {
        const result = await db.query(`
        SELECT * FROM drivers WHERE email = $1`, [email]);
        if (!result.rows[0]) {
            throw new ExpressError(`No such user with email ${email}`)
        }
        console.log(`user: ${result}`)
        return result.rows[0]
    }

    static async registerDriver(driver) {
        console.log(driver)
        const {email, car_brand, car_make, car_year, driver_licence, car_color, online="false"} = driver;
        const postDriver = await db.query(`
            INSERT INTO drivers (
                email,
                car_brand,
                car_make,
                car_year,
                driver_licence,
                car_color,
                online
            )
            VALUES ( $1, $2, $3, $4, $5, $6, $7)
            RETURNING car_brand, car_make
            `,[email, car_brand, car_make, car_year, driver_licence, car_color, online]);
        return postDriver.rows[0]
    }

    static async editDriver(driver) {
        const {car_brand, car_make, car_year, driver_licence, car_color, email} = driver;
        console.log(car_brand, car_make, car_year, driver_licence, car_color, email)
        const postDriver = await db.query(`
            UPDATE drivers SET 
            car_brand = $1,
            car_make = $2,
            car_year = $3,
            driver_licence = $4,
            car_color = $5
            WHERE email = $6
            RETURNING *
        `, [car_brand, car_make, car_year, driver_licence, car_color, email]);
        return postDriver.rows[0]
    }
    
}

module.exports = Driver