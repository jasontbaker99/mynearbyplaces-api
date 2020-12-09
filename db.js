'use strict';

require('dotenv').config();
const { Pool } = require('pg');


const postgreConnectionString =
    `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

const postgrePool = new Pool({
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : postgreConnectionString,
    ssl: { rejectUnauthorized: false }
});

function allPlaces() {
    return postgrePool.query('select name,place,review from mynearbyplaces.places')
    .then(result => result.rows);
}

// s

// function findByName(name) {
//     return postgrePool.query('select name,place,review from mynearbyplaces.places WHERE name LIKE \'%$1%\'',[name])
//     .then(result => result.rows);
// }

function addPlace(name,place,review) {
    return postgrePool.query('INSERT INTO mynearbyplaces.places (name,place,review) values ($1, $2, $3)', [name, place, review]);
}

module.exports = {allPlaces, addPlace}