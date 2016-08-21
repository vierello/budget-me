var Backbone = require('backbone');
var $ = window.jQuery = require('jquery');
require('bootstrap-sass');


$.ajaxSetup({
  beforeSend: function(xhr){
    xhr.setRequestHeader('X-Parse-Application-Id', 'bakklam');
    xhr.setRequestHeader('X-Parse-REST-API-Key', 'bakklamkey');
  }
});

require('./router');


$(function(){
  Backbone.history.start();
});
