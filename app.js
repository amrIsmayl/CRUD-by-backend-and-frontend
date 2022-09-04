
const { json } = require('body-parser');
const express = require('express');
const app = express();
const mySql = require('mysql2');
const cors = require('cors');

app.use(cors());

const q = mySql.createConnection({
    host: 'localhost',
    database: 'project1',
    user: 'root',
    password: ''
})

app.use(express.json());

app.post('/addProduct', (req, res) => {
    const { name, price, description } = req.body;
    q.execute(`insert into product (name,price,description) values ('${name}','${price}','${description}')`);
    res.json({ message: 'success' });

});


app.get('/allproduct', (req, res) => {
    q.execute('select * from product', (err, result) => {
        res.json({ message: 'success' , product: result })
    })
});


app.put('/update', (req, res) => {
    const { id, name , price , description } = req.body;
    q.execute(`update product set name = '${name}' , price = '${price}' , description = '${description}'  where id = ${id} `);
    res.json({ message: 'success' });
});


app.delete('/delete', (req, res) => {
    const { id } = req.body;
    q.execute(`delete from product where id = ${id} `);
    res.json({ message: 'success' });
});




app.listen(3030, () => {
    console.log("runnnnning.........");
})






