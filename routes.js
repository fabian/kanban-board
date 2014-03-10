
var cards = require('./controllers/cards');

module.exports = function(app) {

  app.get('/cards', cards.list);
};
