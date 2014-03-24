var app = app || {};

(function ($) {
    "use strict";

    /**
     * Main Router for known board IDs.
     */
    app.CardsRouter = Backbone.Router.extend({
        routes: {
            ':board': 'index',
            ':board/add': 'addCard',
            ':board/cards/:id': 'editCard'
        },
        initialize: function () {

            // cache for card collections
            this.boards = {};
        },
        index: function(board) {

            // render index view with card collection
            this.render(board, _.bind(function () {
                return new app.IndexView({
                    board: board,
                    model: this.boards[board]
                });
            }, this));
        },
        addCard: function(board) {

            // render card create form
            this.render(board, _.bind(function () {
                return new app.CardFormView({
                    board: board,
                    cards: this.boards[board],
                    model: new app.Card()
                });
            }, this));
        },
        editCard: function(board, id) {

            // render card edit form
            this.render(board, _.bind(function () {
                return new app.CardFormView({
                    board: board,
                    model: this.boards[board].get(id)
                });
            }, this));
        },
        render: function (board, view) {

            // render callback
            var callback = _.bind(function () {

                // garbage collect old view
                if (this.currentView) {
                    this.currentView.remove();
                }
                this.currentView = view();

                // render new view
                this.currentView.render();
                $('#app').html(this.currentView.el);

            }, this);

            if (this.boards[board]) {

                // cached card collection
                callback();

            } else {

                // load card collection and call render callback
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
