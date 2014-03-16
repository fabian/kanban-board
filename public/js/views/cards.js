var app = app || {};

(function ($) {
    "use strict";

    app.CardView = Backbone.View.extend({
        template: _.template($('#card-template').html()),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
    });

})(jQuery);
