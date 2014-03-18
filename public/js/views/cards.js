var app = app || {};

(function ($) {
    "use strict";

    app.CardView = Backbone.View.extend({
        template: _.template($('#card-template').html()),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    app.CardFormView = Backbone.View.extend({
        template: _.template($('#card-form-template').html()),
        events: {
            'click #save-card': 'saveCard',
            'click #delete-card': 'deleteCard',
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
            if (this.model.isNew()) {
                app.cards.add(this.model);
            }
            this.model.save({}, {
                success: function (model) {
                    app.router.navigate('', {trigger: true});
                }
            });
        },
        deleteCard: function (event) {
            this.model.destroy({
                success: function (model) {
                    app.router.navigate('', {trigger: true});
                }
            });
        }
    });

})(jQuery);
