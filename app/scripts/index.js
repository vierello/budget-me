var Backbone = require('backbone');
var $ = window.jQuery = require('jquery');

require('./router');


$(function(){
  Backbone.history.start()
});
