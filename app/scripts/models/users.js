var Backbone = require('backbone');
var _ = require('underscore');


var User = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://av-awesome-server.herokuapp.com/users',
  toJSON: function(){
    var data = _.clone(this.attributes);
    //console.log(data.password);
    delete data.createdAt;
    delete data.updatedAt;
    return data;
  }
},
  {
  login: function(username, password, callbacks){
    var self = this;
    var loggedInUser = new User();
    var queryString = jQuery.param({'username': username, 'password': password});

    loggedInUser.urlRoot = 'https://av-awesome-server.herokuapp.com/login?' + queryString;
    loggedInUser.fetch().done(function(data){
      localStorage.setItem('user', JSON.stringify(loggedInUser.toJSON()));
      self._setAuthHeaders(data.sessionToken);

      callbacks.success(loggedInUser);

    }).fail(function(error){
      callbacks.fail(loggedInUser, error);
    });
  },

  _setAuthHeaders: function(sessionToken){
    jQuery.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'bakklam');
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'bakklamkey');
        xhr.setRequestHeader('X-Parse-Session-Token', sessionToken);
      }
    });
  },

  restore: function(){
    var userData = JSON.parse(localStorage.getItem('user'));
    var user = new User(userData);
    this._setAuthHeaders(userData.sessionToken);
    return user;
  },

  isLoggedIn: function(){
    return !!localStorage.getItem('user');
  }

});


module.exports = {
  'User': User
};
