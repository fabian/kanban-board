var app = app || {};

$(function () {
    "use scrict";

    // run app routers
    new app.AppRouter();
    new app.CardsRouter();

    Backbone.history.start();
});
