"use strict";

var Cards = require('./Cards'),
    Database = require('./Database');

module.exports = function(app) {

    app.database = new Database(app.get('database_url'));

    app.cards = new Cards(app.database);
};
