var Backbone = require('backbone');


var User = Backbone.Model.extend({
  urlRoot: 'https://av-awesome-server.herokuapp.com/classes/_User'
},{
  login: function(username, password, callbacks){
    var loggedInUser = new User();
    var queryString = jQuery.param({'username': username, 'password': password});

    loggedInUser.urlRoot = 'https://av-awesome-server.herokuapp.com/login?' + queryString;
    loggedInUser.fetch().done(function(data){
      localStorage.setItem('user', JSON.stringify(loggedInUser.toJSON()));
      callbacks.success(loggedInUser);
    }).fail(function(error){
      callbacks.fail(loggedInUser, error);
    });
  }
});

module.exports = {
  'User': User
};
