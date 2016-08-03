var Backbone = require('backbone');

var PointerFieldModel = Backbone.Model.extend({
  setPointer: function(field, obj, className){
    //console.log('id'obj.objectId);
    this.set(field, {'__type': 'Pointer', 'className': className, 'objectId': obj.objectId});
  }
});

var GoalProgress = PointerFieldModel.extend({
  idAttribute: "objectId",
  urlRoot: 'https://av-awesome-server.herokuapp.com/classes/goalprogress',
});

var GoalProgressCollection = Backbone.Collection.extend({
  model: GoalProgress,
  parse: function(serverResponse){
    return serverResponse.results;
  },
  url: function(){
    var url = 'https://av-awesome-server.herokuapp.com/classes/goalprogress';
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
  'GoalProgress': GoalProgress,
  'GoalProgressCollection': GoalProgressCollection
}
