var app = app || {};

(function ($) {
    "use strict";

    app.AppView = Backbone.View.extend({
        el: '#app',
        events: {
            'click #add-card': 'createCard'
        },
        initialize: function () {
            this.listenTo(app.cards, 'reset', this.addAll);
            app.cards.fetch({reset: true});
        },
        render: function () {
        },
        addOne: function (card) {
            var cardView = new app.CardView({model: card});
            this.$el.append(cardView.render().el);
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

})(jQuery);
