var Backbone = require('backbone');

var PointerFieldModel = Backbone.Model.extend({
  setPointer: function(field, obj, className){
    console.log('id', obj.objectId);
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
  query: function(where){
    this.whereClause = '?where=' + encodeURI(JSON.stringify(where));
    return this;
  }
});

module.exports = {
  'Actual': Actual,
  'ActualCollection': ActualCollection
}
