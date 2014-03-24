"use strict";

exports.list = function(req, res) {

    req.app.cards.list(req.params.board, function (cards) {

        // respond with cards
        res.send({
            cards: cards
        });
    });
};

exports.get = function(req, res) {

    req.app.cards.get(req.params.board, req.params.id, function (cards) {

        // check if card was found
        if (cards.length == 1) {

            // return card
            res.send(cards[0]);
        } else {

            // send error message
            res.send(404);
        }
    });
};

exports.update = function(req, res) {

    req.app.cards.get(req.params.board, req.params.id, function (cards) {

        // check if card was found
        if (cards.length == 1) {

            var card = cards[0];

            // update card
            card.title = req.body.title;
            card.description = req.body.description;
            card.person = req.body.person;
            card.status = req.body.status;
            card.estimate = req.body.estimate;

            req.app.cards.update(req.params.board, card);

            // send notification via WebSocket
            req.app.push.send(req.params.board, 'update', card);

            // return updated card
            res.send(card);

        } else {

            // send error message
            res.send(404);
        }
    });
};

exports.remove = function(req, res) {

    req.app.cards.get(req.params.board, req.params.id, function (cards) {

        // check if card was found
        if (cards.length == 1) {

            // remove card
            req.app.cards.remove(req.params.board, cards[0]);

            // send notification via WebSocket
            req.app.push.send(req.params.board, 'remove', cards[0]);

            // 204 No Content
            res.send(204)

        } else {

            // send error message
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

    req.app.cards.create(req.params.board, card, function (cards) {

        // send notification via WebSocket
        req.app.push.send(req.params.board, 'create', cards[0]);

        // return created card
        res.send(cards[0]);
    });
};
