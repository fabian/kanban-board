var app = app || {};

(function ($) {
    "use strict";

    app.AppView = Backbone.View.extend({
        el: '#app',
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
        addAll: function () {
            app.cards.each(this.addOne, this);
        }
    });

})(jQuery);
