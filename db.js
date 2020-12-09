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

function findByName(name) {
    return postgrePool.query('select name,place,review from mynearbyplaces.places WHERE name LIKE \'%$1%\'',[name])
    .then(result => result.rows);
}

function findByPlace(place) {
    return postgrePool.query('select name,place,review from mynearbyplaces.places WHERE place LIKE \'%$1%\'',[place])
    .then(result => result.rows);
}

function addPlace(name,place,review) {
    return postgrePool.query('INSERT INTO mynearbyplaces.places (name,place,review) values ($1, $2, $3) returning name', [name, place, review])
    .then(x => x.rows);
}

function addReview(name,review) {
    let rev = String(','+review);
    return postgrePool.query('UPDATE mynearbyplaces.places SET review=$2 WHERE name=$1 returning name', [name, rev])
    .then(x => x.rows);
}

function deletePlace(name) {
    return postgrePool.query('DELETE FROM mynearbyplaces.places WHERE name=$1 returning name', [name])
    .then(x => x.rows);
}

module.exports = {allPlaces, addPlace, deletePlace, findByName, findByPlace, addReview}