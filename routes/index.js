"use strict";

module.exports = function(app) {

    var cards = require('../controllers/cards');

    app.get('/cards', cards.list);
    app.get('/cards/:id', cards.get);
    app.put('/cards/:id', cards.update);
    app.delete('/cards/:id', cards.remove);
    app.post('/cards', cards.create);

};
