var Backbone = require('backbone');

var File = Backbone.Model.extend({
  defaults: {
    name: 'default.jpg'
  },
  urlRoot: function(){
    return '/files/' + this.get('name');
  }
});

module.exports = {
  'File': File
};
