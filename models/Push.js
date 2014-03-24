"use strict";

/**
 * Model to send notification over a WebSocket.
 */
var Push = function (wss) {

    // auto_increment
    this.id = 0;
    this.clients = [];

    wss.on('connection', this.connect.bind(this));
};

Push.prototype.connect = function (ws) {

    // ID, increment
    var id = this.id++;

    // add socket to clients
    this.clients[id] = {board: null, socket: ws};

    // first message will set board
    ws.on('message', (function(message) {
        this.clients[id].board = message;
    }).bind(this));

    // remove client on disconnect
    ws.on('close', (function() {
        delete this.clients[id];
    }).bind(this));
};

Push.prototype.send = function (board, action, card) {

    var id,
        client;

    for (id in this.clients) {

        client = this.clients[id];

        // publish change for all clients with same board
        if (client.board == board) {
            client.socket.send(JSON.stringify({action: action, card: card}));
        }
    }
};

module.exports = Push;
