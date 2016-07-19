var Backbone = require('backbone');


var Goal = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://av-awesome-server.herokuapp.com/classes/goals'
});

var GoalCollection = Backbone.Collection.extend({
  model: Budget,
  url: 'https://av-awesome-server.herokuapp.com/classes/goals',
  parse: function(serverResponse){
    return serverResponse.results;
  }
});

module.exports = {
  'Goal': Goal,
  'GoalCollection': GoalCollection
};