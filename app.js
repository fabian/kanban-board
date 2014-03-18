"use strict";

var express = require('express');

var app = express(),
    path = require('path');

app.set('port', process.env.PORT || 3000);
app.set('database_url', process.env.DATABASE_URL || 'postgres://localhost/kanban');

app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// load routes and models
require('./models')(app);
require('./routes')(app);

app.listen(app.get('port'), function() {
    console.log('Listening on ' + app.get('port'));
});
