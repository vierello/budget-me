var Backbone = require('backbone');

var File = Backbone.Model.extend({
  defaults: {
    name: 'default.jpg'
  },
  urlRoot: function(){
    return 'https://av-awesome-server.herokuapp.com/files/' + encodeURIComponent(this.get('name'));
  },
  save: function(attributes, options){
    options = options || {};
    attributes = attributes || {};

    this.set(attributes);

    var image = this.get('data');
    options.data = image;
    options.processData = false;
    options.contentType = false;
    options.beforeSend = function(request){
      request.setRequestHeader("X-Parse-Application-Id", "bakklam");
      request.setRequestHeader("X-Parse-REST-API-Key", "bakklamkey");
      request.setRequestHeader("Content-Type", image.type);
    }

    // var serverUrl = this.urlRoot();
    // jQuery.ajax({
    //   type: "POST",
    //   beforeSend: function(request) {
    //     request.setRequestHeader("X-Parse-Application-Id", "bakklam");
    //     request.setRequestHeader("X-Parse-REST-API-Key", "bakklamkey");
    //     request.setRequestHeader("Content-Type", image.type);
    //   },
    //   url: serverUrl,
    //   data: image,
    //   processData: false,
    //   contentType: false,
    //   success: function(data) {
    //     var fileitem = self.fileList[ii];
    //   },
    //   error: function(data) {
    //     var obj = jQuery.parseJSON(data);
    //     alert(obj.error);
    //   }
    // });

    return Backbone.Model.prototype.save.call(this, attributes, options);
  }
});

module.exports = {
  'File': File
};
