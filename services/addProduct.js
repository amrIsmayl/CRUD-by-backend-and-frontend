const router = require('express').Router();
const q = require('../database/dbConction');

router.post('/addProduct', (req, res) => {
    const { name, price, description } = req.body;
    q.execute(`insert into product (name,price,description) values ('${name}','${price}','${description}')`);
    res.json({ message: 'success' });

});

module.exports = router