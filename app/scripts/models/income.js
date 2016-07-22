var Backbone = require('backbone');


var Income = Backbone.Model.extend({

});

var IncomeCollection = Backbone.Collection.extend({
  model: Income

});

module.exports = {
  'Income': Income,
  'IncomeCollection': IncomeCollection
};
