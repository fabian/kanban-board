var app = app || {};

(function ($) {
    "use strict";

    app.AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'add': 'addCard',
            'cards/:id': 'editCard'
        },

        initialize: function () {
            this.indexView = new app.IndexView();
        },

        index: function() {
            this.indexView.render();
        },

        addCard: function() {
            var view = new app.AddCardView({
                model: new app.Card()
            });
            view.render();
        },

        editCard: function(id) {
            var view = new app.AddCardView({
                model: app.cards.get(id)
            });
            view.render();
        }
    });

})(jQuery);
