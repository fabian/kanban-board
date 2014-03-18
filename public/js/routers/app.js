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
        },

        index: function() {
            this.render(new app.IndexView());
        },

        addCard: function() {
            this.render(new app.CardFormView({
                model: new app.Card()
            }));
        },

        editCard: function(id) {
            this.render(new app.CardFormView({
                model: app.cards.get(id)
            }));
        },

        render: function (view) {

            if (this.currentView) {
                this.currentView.remove();
            }

            view.render();
            $('#app').html(view.el);

            this.currentView = view;
        }
    });

})(jQuery);
