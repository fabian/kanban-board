
var database = [
    {
        id: 1,
        title: 'As a user I see changes by another user instantly',
        description: '',
        person: '',
        status: 'todo',
        estimate: '1'
    },
    {
        id: 2,
        title: 'As a user I can delete a card',
        description: '',
        person: '',
        status: 'todo',
        estimate: '1'
    }
];

var Card = function () {
    
};

Card.list = function () {
    return database;
};

Card.get = function (id) {
    var card = null;
    database.forEach(function (c) {
        if (c.id == id) {
            card = c;
        }
    });
    return card;
};

Card.update = function (card) {
    database.forEach(function (c, i) {
        if (c.id == card.id) {
            database[i] = card;
        }
    });
};

Card.remove = function (card) {
    database.forEach(function (c, i) {
        if (c.id == card.id) {
            database.splice(i, 1);
        }
    });
};

Card.create = function (card) {

    card.id = database.length + 1;
    database.push(card);

    return card;
};

module.exports = Card;
