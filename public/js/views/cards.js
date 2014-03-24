var app = app || {};

(function ($) {
    "use strict";

    app.CardView = Backbone.View.extend({
        template: _.template($('#card-template').html()),
        events: {
            'dragstart': 'dragStart'
        },
        initialize: function (options) {
            this.board = options.board;
        },
        dragStart: function (e) {
            var dataTransfer = e.originalEvent.dataTransfer;
            dataTransfer.effectAllowed = 'move';
            dataTransfer.setData('text', '' + this.model.get('id'));
            dataTransfer.setDragImage(e.target, 30, 20);
            return true;
        },
        render: function () {
            var data = this.model.toJSON();
            data.board = this.board;
            this.$el.html(this.template(data));
        }
    });

    app.CardFormView = Backbone.View.extend({
        template: _.template($('#card-form-template').html()),
        events: {
            'click #save-card': 'saveCard',
            'click #delete-card': 'deleteCard'
        },
        initialize: function (options) {
            this.board = options.board;
            this.cards = options.cards;
        },
        render: function () {
            var data = this.model.toJSON();
            data.board = this.board;
            this.$el.html(this.template(data));
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
                this.cards.add(this.model);
            }
            this.model.save({}, {
                success: _.bind(function (model) {
                    Backbone.history.navigate(this.board, {trigger: true});
                }, this)
            });
        },
        deleteCard: function (event) {
            this.model.destroy({
                success: _.bind(function (model) {
                    Backbone.history.navigate(this.board, {trigger: true});
                }, this)
            });
        }
    });

})(jQuery);
