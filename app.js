"use strict";

var express = require('express'),
    http = require('http'),
    path = require('path'),
    WebSocketServer = require('ws').Server,
    app = express(),
    Push = require('./models/Push');

app.set('port', process.env.PORT || 3000);
app.set('database_url', process.env.DATABASE_URL || 'postgres://localhost/kanban');

app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// load routes and models
require('./models')(app);
require('./routes')(app);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('Listening on ' + app.get('port'));
});

var wss = new WebSocketServer({server: server});
app.push = new Push(wss);
