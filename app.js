"use strict";

var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

// load routes
require('./routes')(app);

app.listen(app.get('port'), function() {
    console.log('Listening on ' + app.get('port'));
});
