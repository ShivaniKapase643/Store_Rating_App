const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "manager",
    database: "store_rating",
    connectionLimit: 10
});

module.exports = db.promise();