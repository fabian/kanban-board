var app = app || {};

(function ($) {
    "use strict";

    app.CardsRouter = Backbone.Router.extend({
        routes: {
            ':board': 'index',
            ':board/add': 'addCard',
            ':board/cards/:id': 'editCard'
        },

        initialize: function () {
            this.boards = {};
        },

        index: function(board) {
            this.render(board, _.bind(function () {
                return new app.IndexView({
                    board: board,
                    model: this.boards[board]
                });
            }, this));
        },

        addCard: function(board) {
            this.render(board, _.bind(function () {
                return new app.CardFormView({
                    board: board,
                    cards: this.boards[board],
                    model: new app.Card()
                });
            }, this));
        },

        editCard: function(board, id) {
            this.render(board, _.bind(function () {
                return new app.CardFormView({
                    board: board,
                    model: this.boards[board].get(id)
                });
            }, this));
        },

        render: function (board, view) {

            var callback = _.bind(function () {

                if (this.currentView) {
                    this.currentView.remove();
                }
                this.currentView = view();

                this.currentView.render();
                $('#app').html(this.currentView.el);

            }, this);

            if (this.boards[board]) {
                callback();
            } else {
                var cards = new app.CardList([], {
                    board: board
                });
                cards.fetch({
                    reset: true,
                    success: callback
                });
                this.boards[board] = cards;
            }
        }
    });

})(jQuery);
