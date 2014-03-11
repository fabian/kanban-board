"use strict";

exports.list = function(req, res) {

    var cards = req.app.Card.list();

    res.send({
        cards: cards
    });
};
