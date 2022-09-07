const mySql = require('mysql2');


const q = mySql2.createConnection({
    host: 'localhost',
    database: 'project1',
    user: 'root',
    password: ''
})

module.exports = q