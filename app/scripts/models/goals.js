var Backbone = require('backbone');


var Goal = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://av-awesome-parse-server.herokuapp.com/class/Goals'
});

var GoalCollection = Backbone.Collection.extend({
  model: Budget,
  url: 'https://av-awesome-parse-server.herokuapp.com/class/Goals',
  parse: function(serverResponse){
    return serverResponse.results;
  }
});

module.exports = {
  'Goal': Goal,
  'GoalCollection': GoalCollection
};
