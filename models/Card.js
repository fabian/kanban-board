
var database = [
    {
        title: 'As a user I see changes by another user instantly'
    },
    {
        title: 'As a user I can delete a card'
    }
];

var Card = function () {
    
};

Card.list = function () {
    return database;
};

Card.create = function (card) {

    database.push(card);

    return card;
};

module.exports = Card;
