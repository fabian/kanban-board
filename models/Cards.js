"use strict";

/**
 * The main model to access the Cards storage.
 */
var Cards = function (database) {
    this.database = database;
};

Cards.prototype.list = function (board, callback) {
    this.database.query('SELECT id, title, description, person, status, estimate FROM cards WHERE board = $1', [board], callback);
};

Cards.prototype.get = function (board, id, callback) {
    this.database.query('SELECT id, title, description, person, status, estimate FROM cards WHERE board = $1 AND id = $2 LIMIT 1', [board, id], callback);
};

Cards.prototype.update = function (board, card) {
    this.database.query('UPDATE cards SET title = $3, description = $4, person = $5, status = $6, estimate = $7 WHERE board = $1 AND id = $2', [
        board,
        card.id,
        card.title,
        card.description,
        card.person,
        card.status,
        card.estimate
    ]);
};

Cards.prototype.remove = function (board, card) {
    this.database.query('DELETE FROM cards WHERE board = $1 AND id = $2', [board, card.id]);
};

Cards.prototype.create = function (board, card, callback) {
    this.database.query('INSERT INTO cards (board, title, description, person, status, estimate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, title, description, person, status, estimate', [
        board,
        card.title,
        card.description,
        card.person,
        card.status,
        card.estimate
    ], callback);
};

module.exports = Cards;
