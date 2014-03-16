var app = app || {};

(function ($) {
    "use strict";

    app.AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'add': 'addCard'
        },

        index: function() {
            this.renderView(new app.IndexView());
        },

        addCard: function() {
            this.renderView(new app.AddCardView());
        },

        renderView : function(view) {
            this.view && this.view.remove();
            this.view = view;
            this.view.render();
            $('#app').html(this.view.el);
        }
    });

    app.IndexView = Backbone.View.extend({
        events: {
            'click #add-card': 'createCard'
        },
        initialize: function () {
            this.listenTo(app.cards, 'reset', this.addAll);
            app.cards.fetch({reset: true});
        },
        render: function () {
            this.$el.html(_.template($('#index-template').html()));
        },
        addOne: function (card) {
            var cardView = new app.CardView({model: card});
            cardView.render();
            $('#stack-todo').append(cardView.el);
        },
        createCard: function () {
            var card = new app.Card({title: 'Test'});
            app.cards.add(card);
            card.save();
        },
        addAll: function () {
            app.cards.each(this.addOne, this);
        }
    });

    app.AddCardView = Backbone.View.extend({
        render: function () {
            this.$el.html(_.template($('#card-form-template').html()));
        }
    });

})(jQuery);
