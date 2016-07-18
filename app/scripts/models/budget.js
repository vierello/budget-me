var Backbone = require('backbone');


var Budget = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://av-awesome-parse-server.herokuapp.com/class/Budgets'
});

var BudgetCollection = Backbone.Collection.extend({
  model: Budget,
  url: 'https://av-awesome-parse-server.herokuapp.com/class/Budgets',
  parse: function(serverResponse){
    return serverResponse.results;
  }
});

module.exports = {
  'Budget': Budget,
  'BudgetCollection': BudgetCollection
};
