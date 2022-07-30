const mysql = require('mysql2');

//connection, formerly known as db
const connection = mysql.createPool({
    host: 'localhost',
    database: 'employee',
    user: 'root',
    password: process.env.DB_PASS
});
//createPool is asynchronous compared to createConnection which is a single pipeline
//which means that each user had to wait for the user in front of them for their request to complete
module.exports = connection;
// const { getRandomValues } = require('crypto');
//above is the same as: const {v4: uuid} = require('uuid');