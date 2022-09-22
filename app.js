const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(require('./services/addProduct'));
app.use(require('./services/allproduct'));
app.use(require('./services/delete'));
app.use(require('./services/update'));

app.listen(3030, () => {
    console.log("runnnnning.........");
})



