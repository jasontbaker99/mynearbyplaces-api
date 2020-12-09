const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
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

app.post('/addplace', (request, response) => {
    let name = request.body.name;
    let place = request.body.place;
    let review = request.body.review;
    db.addPlace(name,place,review).then(x => response.json({message: 'Added place'}));
});

app.listen(port, () => {
    console.log('Listening on port '+port);
});

//get quiz info
//get quiz info by quiz id
//push score

