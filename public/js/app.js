var app = app || {};

$(function () {
    "use scrict";

    new app.AppRouter();
    new app.CardsRouter();

    Backbone.history.start();
});
