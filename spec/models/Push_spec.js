"use strict";

require('jasmine-expect');

var Push = require('../../models/Push');

var wss = {};

describe('Push Model', function () {

    var push;

    beforeEach(function () {

        wss.on = jasmine.createSpy();

        push = new Push(wss);
    });

    describe('constructor', function () {

        it('subscribes to ws', function () {

            expect(wss.on).toHaveBeenCalledWith('connection', jasmine.any(Function));
        });
    });

    describe('connect', function () {

        it('subscribes to messages', function () {

            var ws = {};
            ws.on = jasmine.createSpy().andCallFake(function (message, callback) {
                if (message == 'message') {
                    callback('random');
                }
            });

            push.connect(ws);

            expect(push.clients).toEqual([
                {
                    board: 'random',
                    socket: ws
                }
            ]);

            expect(ws.on).toHaveBeenCalledWith('message', jasmine.any(Function));
            expect(ws.on).toHaveBeenCalledWith('close', jasmine.any(Function));
        });

        it('removes client on close', function () {

            var ws = {};
            ws.on = jasmine.createSpy().andCallFake(function (message, callback) {
                if (message == 'close') {
                    callback();
                }
            });

            push.connect(ws);

            expect(push.clients).toEqual([undefined]);
        });
    });

    describe('send', function () {

        it('sends message to clients', function () {

            var ws = {},
                ws2 = {};
            ws.send = jasmine.createSpy();
            ws2.send = jasmine.createSpy();

            push.clients.push({board: 'random', socket: ws});
            push.clients.push({board: 'foo', socket: ws2});

            push.send('random', 'added', {
                id: '1',
                title: 'Some title'
            });

            expect(ws.send).toHaveBeenCalledWith('{"action":"added","card":{"id":"1","title":"Some title"}}');
            expect(ws2.send).not.toHaveBeenCalled();
        });
    });
});
