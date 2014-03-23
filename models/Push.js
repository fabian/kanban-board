"use strict";

var Push = function (wss) {

    this.id = 0;
    this.clients = [];

    wss.on('connection', this.connect.bind(this));
};

Push.prototype.connect = function (ws) {

    var id = this.id++;

    this.clients[id] = {board: null, socket: ws};

    ws.on('message', (function(message) {
        this.clients[id].board = message;
    }).bind(this));

    ws.on('close', (function() {
        delete this.clients[id];
    }).bind(this));
};

Push.prototype.send = function (board, action, card) {

    var client;

    for (var id in this.clients) {
        client = this.clients[id];
        if (client.board == board) {
            client.socket.send(JSON.stringify({action: action, card: card}));
        }
    }
};

module.exports = Push;
