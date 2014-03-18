var app = app || {};

(function () {
    "use scrict";

    app.Card = Backbone.Model.extend({
        urlRoot: 'cards'
    });

    app.CardList = Backbone.Collection.extend({       
        model: app.Card,
        url: 'cards',
        parse: function(response) {
            return response.cards;
        }
    });

})();
