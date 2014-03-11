"use strict";

module.exports = function(app) {

    var cards = require('../controllers/cards');

    app.get('/cards', cards.list);
    app.post('/cards', cards.create);

};
