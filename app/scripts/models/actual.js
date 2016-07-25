var Backbone = require('backbone');

var PointerFieldModel = Backbone.Model.extend({
  setPointer: function(field, obj, className){
    this.set(field, {'__type': 'Pointer', 'className': className, 'objectId': obj.objectId});
  }
});

var Actual = PointerFieldModel.extend({
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
