"use strict";

require('jasmine-expect');

var controller = require('../../controllers/cards');

var app = {};

app.cards = {
    list: function (callback) {
        callback([
            {id: 1, title: 'First'},
            {id: 2, title: 'Second'}
        ]);
    }
};

var request = {
    app: app
};

var response = {
    body: {},
    send: function (body) {
        this.body = body;
    }
};

describe('Cards Controller', function () {

    describe('List', function () {

        it('returns cards', function () {
            controller.list(request, response);
            expect(response.body.cards.length).toEqual(2);
        });
    });
});
