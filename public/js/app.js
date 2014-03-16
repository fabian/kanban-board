var app = app || {};

$(function () {
    "use scrict";

    app.cards = new app.CardList();

    new app.AppRouter();

    Backbone.history.start();

});
