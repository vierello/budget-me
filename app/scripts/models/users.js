var Backbone = require('backbone');


var User = React.Model.extend({
  urlRoot: 'https://av-awesome-parse-server.herokuapp.com/classes/User'
},{
  login: function(username, password){
    var loggedInUser = new User();
    var queryString = jQuery.param({'username': username, 'password': password});

    loggedInUser.urlRoot = 'https://av-awesome-parse-server.herokuapp.com/login?' + queryString;
    return loggedInUser.fetch();
  }
});

module.exports = {
  'User': User
};
