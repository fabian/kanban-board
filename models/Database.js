"use strict";

var pg = require('pg')

var Database = function (url) {
    this.url = url;
};

Database.prototype.query = function (query, values, callback) {

    pg.connect(this.url, function(err, client, done) {

        client.query(query, values, function(err, result) {
            done();
            if (err) {
                console.error(err);
            } else {
                if (callback) {
                    callback(result.rows);
                }
            }
        });
    });
};

module.exports = Database;
