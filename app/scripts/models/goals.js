var Backbone = require('backbone');

var PointerFieldModel = Backbone.Model.extend({
  setPointer: function(field, obj, className){
    this.set(field, {'__type': 'Pointer', 'className': className, 'objectId': obj.objectId});
  }
});

var Goal = PointerFieldModel.extend({
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
