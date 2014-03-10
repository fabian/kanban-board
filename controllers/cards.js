"use strict";

exports.list = function(req, res){

    var cards = [];

    res.send({
        cards: cards
    });
};
