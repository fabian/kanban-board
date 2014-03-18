"use strict";

exports.list = function(req, res) {

    req.app.cards.list(function (cards) {

        res.send({
            cards: cards
        });
    });
};

exports.get = function(req, res) {

    req.app.cards.get(req.params.id, function (cards) {

        if (cards.length == 1) {
            res.send(cards[0]);
        } else {
            res.send(404);
        }
    });
};

exports.update = function(req, res) {

    req.app.cards.get(req.params.id, function (cards) {

        if (cards.length == 1) {

            var card = cards[0];

            card.title = req.body.title;
            card.description = req.body.description;
            card.person = req.body.person;
            card.status = req.body.status;
            card.estimate = req.body.estimate;

            req.app.cards.update(card);

            res.send(card);

        } else {
            res.send(404);
        }
    });
};

exports.remove = function(req, res) {

    req.app.cards.get(req.params.id, function (cards) {

        if (cards.length == 1) {

            req.app.cards.remove(cards[0]);

            res.send(204)

        } else {
            res.send(404);
        }
    });
};

exports.create = function(req, res) {

    var card = {};

    card.title = req.body.title;
    card.description = req.body.description;
    card.person = req.body.person;
    card.status = req.body.status;
    card.estimate = req.body.estimate;

    req.app.cards.create(card, function (cards) {
        res.send(cards[0]);
    });
};
