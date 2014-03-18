"use strict";

var Cards = function (database) {
    this.database = database;
};

Cards.prototype.list = function (callback) {
    this.database.query('SELECT * FROM cards', [], callback);
};

Cards.prototype.get = function (id, callback) {
    this.database.query('SELECT * FROM cards WHERE id = $1 LIMIT 1', [id], callback);
};

Cards.prototype.update = function (card) {
    this.database.query('UPDATE cards SET title = $2, description = $3, person = $4, status = $5, estimate = $6 WHERE id = $1', [
        card.id,
        card.title,
        card.description,
        card.person,
        card.status,
        card.estimate
    ]);
};

Cards.prototype.remove = function (card) {
    this.database.query('DELETE FROM cards WHERE id = $1', [card.id]);
};

Cards.prototype.create = function (card, callback) {
    this.database.query('INSERT INTO cards (title, description, person, status, estimate) VALUES ($1, $2, $3, $4, $5) RETURNING id', [
        card.title,
        card.description,
        card.person,
        card.status,
        card.estimate
    ], callback);
};

module.exports = Cards;
