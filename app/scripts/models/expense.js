var Backbone = require('backbone');


var Expense = Backbone.Model.extend({

});

var ExpenseCollection = Backbone.Collection.extend({
  model: Expense

});

module.exports = {
  'Expense': Expense,
  'ExpenseCollection': ExpenseCollection
};
