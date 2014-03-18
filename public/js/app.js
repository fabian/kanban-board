var app = app || {};

$(function () {
    "use scrict";

    app.cards = new app.CardList();

    app.cards.fetch({
        reset: true,
        success: function () {
            app.router = new app.AppRouter();
            Backbone.history.start();
        }
    });
});
