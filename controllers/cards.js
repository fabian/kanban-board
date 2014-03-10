"use strict";

var Card = require('../models/Card');

exports.list = function(req, res){

    var cards = Card.list();

    res.send({
        cards: cards
    });
};
