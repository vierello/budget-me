var Backbone = require('backbone');

var Actual = Backbone.Model.extend({
  idAttribute: "objectId",
  urlRoot: 'https://av-awesome-server.herokuapp.com/classes/actual'
});

var ActualCollection = Backbone.Collection.extend({
  model: Actual,
  url: 'https://av-awesome-server.herokuapp.com/classes/actual',
  parse: function(serverResponse){
    return serverResponse.results;
  }
});

module.exports = {
  'Actual': Actual,
  'ActualCollection': ActualCollection
}
