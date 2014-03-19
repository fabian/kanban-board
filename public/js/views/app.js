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
            this.socket = new WebSocket(location.origin.replace(/^http/, 'ws'));
            this.socket.onopen = _.bind(function () {
                this.socket.send(this.board);
            }, this);
            this.socket.onmessage = _.bind(function (event) {
                var data = JSON.parse(event.data);
                if (data.action == 'create') {
                    this.model.add(new app.Card(data.card));
                } else if (data.action == 'update') {
                   var card = this.model.get(data.card.id);
                   card.set(data.card);
                } else if (data.action == 'remove') {
                    var card = this.model.get(data.card.id);
                    this.model.remove(card);
                }
                this.render();
            }, this);
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
        },
        remove: function () {
            this.socket.close();
            Backbone.View.prototype.remove.call(this, arguments);
        }
    });

})(jQuery);
