var app = app || {};

(function () {
    "use scrict";

    /**
     * Main card model.
     */
    app.Card = Backbone.Model.extend({
    });

    /**
     * Card collection model. Always needs a board.
     */
    app.CardList = Backbone.Collection.extend({       
        model: app.Card,
        initialize: function (models, options) {
            this.board = options.board;
        },
        url: function () {
            return this.board + '/cards';
        },
        parse: function(response) {
            return response.cards;
        }
    });

})();
