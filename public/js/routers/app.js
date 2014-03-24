var app = app || {};

(function ($) {
    "use strict";

    /**
     * Generates a random board ID with 12 characters.
     */
    function randomBoard() {

        var board = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < 12; i++ ) {
            board += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return board;
    }

    /**
     * Router to redirect to random board ID.
     */
    app.AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index'
        },
        index: function() {
            this.navigate(randomBoard(), {trigger: true});
        }
    });

})(jQuery);
