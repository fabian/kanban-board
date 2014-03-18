"use strict";

exports.list = function(req, res) {

    var cards = req.app.models.Card.list();

    res.send({
        cards: cards
    });
};

exports.get = function(req, res) {

    var card = req.app.models.Card.get(req.params.id);

    if (card) {
        res.send(card);
    } else { 
        res.send(404);
    }
};

exports.update = function(req, res) {

    var card = req.app.models.Card.get(req.params.id);

    if (card) {

        card.title = req.body.title;
        card.description = req.body.description;
        card.person = req.body.person;
        card.status = req.body.status;
        card.estimate = req.body.estimate;

        req.app.models.Card.update(card);

        res.send(card);
    } else { 
        res.send(404);
    }
};

exports.remove = function(req, res) {

    var card = req.app.models.Card.get(req.params.id);

    if (card) {

        req.app.models.Card.remove(card);

        res.send(204);
    } else { 
        res.send(404);
    }
};

exports.create = function(req, res) {

    var card = req.app.models.Card.create(req.body);

    res.send(card);
};
