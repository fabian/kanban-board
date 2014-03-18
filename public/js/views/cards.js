var app = app || {};

(function ($) {
    "use strict";

    app.CardView = Backbone.View.extend({
        template: _.template($('#card-template').html()),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    app.AddCardView = Backbone.View.extend({
        el: '#app',
        template: _.template($('#card-form-template').html()),
        events: {
            'click #save-card': 'saveCard'
        },
        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$('#title').val(this.model.get('title'));
            this.$('#description').val(this.model.get('description'));
            this.$('#person').val(this.model.get('person'));
            this.$('#status').val(this.model.get('status'));
            this.$('#estimate').val(this.model.get('estimate'));
        },
        saveCard: function (event) {
            this.model.set('title', this.$('#title').val());
            this.model.set('description', this.$('#description').val());
            this.model.set('person', this.$('#person').val());
            this.model.set('status', this.$('#status').val());
            this.model.set('estimate', this.$('#estimate').val());
            this.model.save({}, {
                success: function (model) {
                    app.cards.add(model);
                    app.router.navigate('', {trigger: true});
                }
            });
        }
    });

})(jQuery);
