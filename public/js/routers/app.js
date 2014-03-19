var app = app || {};

(function ($) {
    "use strict";

    function randomBoard() {
        var board = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < 12; i++ ) {
            board += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return board;
    }

    app.AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index'
        },

        index: function() {
            this.navigate(randomBoard(), {trigger: true});
        }
    });

})(jQuery);
