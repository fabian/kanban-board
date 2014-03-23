"use strict";

require('jasmine-expect');

var controller = require('../../controllers/cards');

var app = {
    cards: {},
    push: {}
};

var request = {
    app: app,
    params: {
        board: 'random'
    }
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

            app.cards.list = jasmine.createSpy().andCallFake(function (board, callback) {
                callback([
                    {id: 1, title: 'First'},
                    {id: 2, title: 'Second'}
                ]);
            });

            controller.list(request, response);

            expect(response.body.cards.length).toEqual(2);
            expect(app.cards.list).toHaveBeenCalledWith('random', jasmine.any(Function));
        });
    });

    describe('Get', function () {

        it('returns card', function () {

            app.cards.get = jasmine.createSpy().andCallFake(function (board, id, callback) {
                callback([
                    {id: 1, title: 'Title'}
                ]);
            });

            request.params.id = '1';

            controller.get(request, response);

            expect(response.body.title).toEqual('Title');
            expect(app.cards.get).toHaveBeenCalledWith('random', '1', jasmine.any(Function));
        });

        it('sends 404', function () {

            app.cards.get = jasmine.createSpy().andCallFake(function (board, id, callback) {
                callback([]);
            });

            request.params.id = '999';

            controller.get(request, response);

            expect(response.body).toEqual(404);
        });
    });

    describe('Update', function () {
    
        it('updates card', function () {
    
            app.cards.get = jasmine.createSpy().andCallFake(function (board, id, callback) {
                callback([
                    {id: 1, title: 'Title'}
                ]);
            });
            app.cards.update = jasmine.createSpy();
            app.push.send = jasmine.createSpy();
    
            request.params.id = '1';
            request.body = {
                title: 'New title',
                description: 'Some text',
                person: 'Max',
                status: 'todo',
                estimate: '3'
            };
    
            controller.update(request, response);
    
            expect(response.body.title).toEqual('New title');
            expect(app.cards.get).toHaveBeenCalledWith('random', '1', jasmine.any(Function));
            expect(app.cards.update).toHaveBeenCalledWith('random', {
                id: 1,
                title: 'New title',
                description: 'Some text',
                person: 'Max',
                status: 'todo',
                estimate: '3'
            });
            expect(app.push.send).toHaveBeenCalledWith('random', 'update', {
                id: 1,
                title: 'New title',
                description: 'Some text',
                person: 'Max',
                status: 'todo',
                estimate: '3'
            });
        });
    
        it('sends 404', function () {
    
            app.cards.get = jasmine.createSpy().andCallFake(function (board, id, callback) {
                callback([]);
            });
    
            request.params.id = '999';
    
            controller.update(request, response);
    
            expect(response.body).toEqual(404);
        });
    });
    
    describe('Remove', function () {
    
        it('removes card', function () {
    
            app.cards.get = jasmine.createSpy().andCallFake(function (board, id, callback) {
                callback([
                    {id: 1}
                ]);
            });
            app.cards.remove = jasmine.createSpy();
            app.push.send = jasmine.createSpy();
    
            request.params.id = '1';
    
            controller.remove(request, response);
    
            expect(response.body).toEqual(204);
            expect(app.cards.get).toHaveBeenCalledWith('random', '1', jasmine.any(Function));
            expect(app.cards.remove).toHaveBeenCalledWith('random', {id: 1});
            expect(app.push.send).toHaveBeenCalledWith('random', 'remove', {id: 1});
        });
    
        it('sends 404', function () {
    
            app.cards.get = jasmine.createSpy().andCallFake(function (board, id, callback) {
                callback([]);
            });
    
            request.params.id = '999';
    
            controller.remove(request, response);
    
            expect(response.body).toEqual(404);
        });
    });

    describe('Create', function () {
    
        it('creates card', function () {
    
            app.cards.create = jasmine.createSpy().andCallFake(function (board, card, callback) {
                callback([
                    {id: 1, title: 'New title'}
                ]);
            });
            app.push.send = jasmine.createSpy();
    
            request.body = {
                title: 'Title',
                description: 'Some text',
                person: 'Max',
                status: 'todo',
                estimate: '3'
            };
    
            controller.create(request, response);
    
            expect(response.body.title).toEqual('New title');
            expect(app.cards.create).toHaveBeenCalledWith('random', {
                title: 'Title',
                description: 'Some text',
                person: 'Max',
                status: 'todo',
                estimate: '3'
            }, jasmine.any(Function));
            expect(app.push.send).toHaveBeenCalledWith('random', 'create', {
                id: 1,
                title: 'New title'
            });
        });
    });
});
