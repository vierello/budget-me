var Backbone = require('backbone');


var Budget = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://av-awesome-server.herokuapp.com/class/budgets'
});

var BudgetCollection = Backbone.Collection.extend({
  model: Budget,
  url: 'https://av-awesome-server.herokuapp.com/class/budgets',
  parse: function(serverResponse){
    return serverResponse.results;
  }
});

module.exports = {
  'Budget': Budget,
  'BudgetCollection': BudgetCollection
};