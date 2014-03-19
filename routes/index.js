"use strict";

module.exports = function(app) {

    var cards = require('../controllers/cards');

    app.get('/:board/cards', cards.list);
    app.get('/:board/cards/:id', cards.get);
    app.put('/:board/cards/:id', cards.update);
    app.delete('/:board/cards/:id', cards.remove);
    app.post('/:board/cards', cards.create);
};
