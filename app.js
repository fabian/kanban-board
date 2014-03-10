"use strict";

var express = require('express');

var app = express(),
    path = require('path');

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// load routes
require('./routes')(app);

app.listen(app.get('port'), function() {
    console.log('Listening on ' + app.get('port'));
});
