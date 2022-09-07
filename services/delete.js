const router = require('express').Router();
const q = require('../database/dbConction');

router.delete('/delete', (req, res) => {
    const { id } = req.body;
    q.execute(`delete from product where id = ${id} `);
    res.json({ message: 'success' });
});

module.exports = router;