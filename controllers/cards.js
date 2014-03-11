"use strict";

exports.list = function(req, res) {

    var cards = req.app.models.Card.list();

    res.send({
        cards: cards
    });
};
