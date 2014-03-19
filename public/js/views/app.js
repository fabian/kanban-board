var app = app || {};

(function ($) {
    "use strict";

    app.IndexView = Backbone.View.extend({
        template: _.template($('#index-template').html()),
        events: {
            'click #add-card': 'createCard'
        },
        initialize: function (options) {
            this.board = options.board;
        },
        render: function () {
            this.$el.html(this.template({board: this.board}));
            if (this.model.length > 0) {
                this.$('.message-no-cards').hide();
                this.model.each(function (card) {
                    var cardView = new app.CardView({
                        board: this.board,
                        model: card
                    });
                    cardView.render();
                    if (card.get('status') == 'in_progress') {
                        this.$('#stack-progress').append(cardView.el);
                    } else if (card.get('status') == 'done') {
                        this.$('#stack-done').append(cardView.el);
                    } else {
                        this.$('#stack-todo').append(cardView.el);
                    }
                }, this);
            } else {
                this.$('.message-no-cards').show();
            }
        }
    });

})(jQuery);
