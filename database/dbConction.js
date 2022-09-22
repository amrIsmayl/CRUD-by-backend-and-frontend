const mySql = require('mysql2');


const q = mySql.createConnection({
    host: 'localhost',
    database: 'project1',
    user: 'root',
    password: ''
})

module.exports = q