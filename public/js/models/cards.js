var app = app || {};

(function () {
    "use scrict";

    app.Card = Backbone.Model.extend({
    });

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
