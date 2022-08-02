const {Client} = require("pg");

let DB_URL;

if (process.env.NODE_ENV === "test") {
    DB_URL = "postgresql:///doordash_test"
} else {
    DB_URL = "postggresql:///doordash"
}

let db = new Client({
    connectionString: DB_URL
});

db.connect();
module.exports = db;