const router = require('express').Router();
const q = require('../database/dbConction');

router.get('/allproduct', (req, res) => {
    q.execute('select * from product', (err, result) => {
        res.json({ message: 'success' , product: result })
    })
});

module.exports = router