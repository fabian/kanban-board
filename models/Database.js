"use strict";

var pg = require('pg')

/**
 * PostgreSQL database access.
 */
var Database = function (url) {
    this.url = url;
};

Database.prototype.query = function (query, values, callback) {

    // connect to database as per http://stackoverflow.com/a/19282657/418614
    pg.connect(this.url, function(err, client, done) {

        // send query, return rows to callback
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
