const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Brewery = db.model('Brewery', {
    name: String,
    est: Number,
    loc: String,
    founder: String
});

module.exports = Brewery;