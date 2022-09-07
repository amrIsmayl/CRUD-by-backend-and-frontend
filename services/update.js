const router = require('express').Router();
const q = require('../database/dbConction');


router.put('/update', (req, res) => {
    const { id, name , price , description } = req.body;
    q.execute(`update product set name = '${name}' , price = '${price}' , description = '${description}'  where id = ${id} `);
    res.json({ message: 'success' });
});

module.exports = router