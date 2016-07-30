var Backbone = require('backbone');

var PointerFieldModel = Backbone.Model.extend({
  setPointer: function(field, obj, className){
    this.set(field, {'__type': 'Pointer', 'className': className, 'objectId': obj.objectId});
  }
});

var Budget = PointerFieldModel.extend({
  defaults: {
    income: [],
    expense: []
  },
  idAttribute: 'objectId',
  urlRoot: 'https://av-awesome-server.herokuapp.com/classes/budgets'
});

var BudgetCollection = Backbone.Collection.extend({
  model: Budget,
  url: 'https://av-awesome-server.herokuapp.com/classes/budgets',
  parse: function(serverResponse){
    return serverResponse.results;
  }
});

module.exports = {
  'Budget': Budget,
  'BudgetCollection': BudgetCollection
};
