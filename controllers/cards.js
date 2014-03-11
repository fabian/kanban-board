"use strict";

exports.list = function(req, res) {

    var cards = req.app.models.Card.list();

    res.send({
        cards: cards
    });
};

exports.create = function(req, res) {

    var card = req.app.models.Card.create(req.body);

    res.send(card);
};
