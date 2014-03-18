var app = app || {};

(function ($) {
    "use strict";

    app.IndexView = Backbone.View.extend({
        el: '#app',
        events: {
            'click #add-card': 'createCard'
        },
        render: function () {
            this.$el.html(_.template($('#index-template').html()));
            app.cards.each(function (card) {
                var cardView = new app.CardView({model: card});
                cardView.render();
                if (card.get('status') == 'in_progress') {
                    this.$('#stack-progress').append(cardView.el);
                } else if (card.get('status') == 'done') {
                    this.$('#stack-done').append(cardView.el);
                } else {
                    this.$('#stack-todo').append(cardView.el);
                }
            }, this);
        }
    });

})(jQuery);
