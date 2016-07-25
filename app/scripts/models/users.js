var Backbone = require('backbone');


var User = Backbone.Model.extend({
  urlRoot: 'https://av-awesome-server.herokuapp.com/users'
},{
  login: function(username, password, callbacks){
    var loggedInUser = new User();
    var queryString = jQuery.param({'username': username, 'password': password});

    loggedInUser.urlRoot = 'https://av-awesome-server.herokuapp.com/login?' + queryString;
    loggedInUser.fetch().done(function(data){
      localStorage.setItem('user', JSON.stringify(loggedInUser.toJSON()));

      jQuery.ajaxSetup({
        beforeSend: function(xhr){
          xhr.setRequestHeader("X-Parse-Application-Id", "bakklam");
          xhr.setRequestHeader("X-Parse-REST-API-Key", "bakklamkey");
          xhr.setRequestHeader("X-Parse-Session-Token", data.sessionToken);
        }
      });
      callbacks.success(loggedInUser);

    }).fail(function(error){
      callbacks.fail(loggedInUser, error);
    });
  }
});

module.exports = {
  'User': User
};
