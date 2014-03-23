"use strict";

require('jasmine-expect');

var Cards = require('../../models/Cards');

var database = {};

describe('Cards Model', function () {

    var cards;

    beforeEach(function() {
        cards = new Cards(database);
    });

    describe('List', function () {

        it('returns cards', function () {

            database.query = jasmine.createSpy();

            cards.list('random', function () {});

            expect(database.query).toHaveBeenCalledWith(jasmine.any(String), ['random'], jasmine.any(Function));
        });
    });

    describe('Get', function () {

        it('returns card', function () {

            database.query = jasmine.createSpy();

            cards.get('random', '1', function () {});

            expect(database.query).toHaveBeenCalledWith(jasmine.any(String), ['random', '1'], jasmine.any(Function));
        });
    });

    describe('Update', function () {

        it('updates card', function () {

            database.query = jasmine.createSpy();

            cards.update('random', {
                id: '1',
                title: 'Title',
                description: 'Some text',
                person: 'Max',
                status: 'todo',
                estimate: '3'
            });

            expect(database.query).toHaveBeenCalledWith(jasmine.any(String), ['random', '1', 'Title', 'Some text', 'Max', 'todo', '3']);
        });
    }); 

    describe('Remove', function () {

        it('removes card', function () {

            database.query = jasmine.createSpy();

            cards.remove('random', {id: '1'});

            expect(database.query).toHaveBeenCalledWith(jasmine.any(String), ['random', '1']);
        });
    });

    describe('Create', function () {

        it('creates card', function () {

            database.query = jasmine.createSpy();

            cards.create('random', {
                title: 'Title',
                description: 'Some text',
                person: 'Max',
                status: 'todo',
                estimate: '3'
            }, function() {});

            expect(database.query).toHaveBeenCalledWith(jasmine.any(String), ['random', 'Title', 'Some text', 'Max', 'todo', '3'], jasmine.any(Function));
        });
    });

});
