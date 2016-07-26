var Backbone = require('backbone');

var PointerFieldModel = Backbone.Model.extend({
  setPointer: function(field, obj, className){
    this.set(field, {'__type': 'Pointer', 'className': className, 'objectId': obj.objectId});
  }
});

var Actual = PointerFieldModel.extend({
  idAttribute: "objectId",
  urlRoot: 'https://av-awesome-server.herokuapp.com/classes/actual',
});

var ActualCollection = Backbone.Collection.extend({
  model: Actual,
  parse: function(serverResponse){
    return serverResponse.results;
  },
  url: function(){
    var url = 'https://av-awesome-server.herokuapp.com/classes/actual';
    if(this.whereClause){
      return url + this.whereClause;
    }else{
      return url;
    }
  },
  where: function(where){
    this.whereClause = '?where=' + encodeURI(JSON.stringify(where));  // more stuff here
    return this;
  }
});

module.exports = {
  'Actual': Actual,
  'ActualCollection': ActualCollection
}
