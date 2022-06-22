const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Beer = db.model('Beer', {
    name: String,
    type: String,
    alc: Number,
    _producer: {
        type: Schema.Types.ObjectId,
        ref: 'Brewery'
    }
});

module.exports = Beer;