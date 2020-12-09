const express = require('express');
var cors = require('cors');
var data = require('./data');
var bodyParser = require('body-parser');
const { request } = require('express');
const app = express();
const db = require('./db');

const port = process.env.PORT || 3000;


//middlewares
app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.json("Yo");
});

app.get('/allplaces', (request, response) => {
    db.allPlaces().then(x => response.json(x));
});

app.listen(port, () => {
    console.log('Listening on port '+port);
});

//get quiz info
//get quiz info by quiz id
//push score

