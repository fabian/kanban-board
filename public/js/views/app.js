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
            this.addAll();
        },
        addOne: function (card) {
            var cardView = new app.CardView({model: card});
            cardView.render();
            this.$('#stack-todo').append(cardView.el);
        },
        addAll: function () {
            app.cards.each(this.addOne, this);
        }
    });

})(jQuery);
