"use strict";

require('jasmine-expect');

var controller = require('../../controllers/cards');

var app = {
    models: {}
};

app.models.Card = {
    list: function () {
        return [
            {},
            {}
        ];
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
