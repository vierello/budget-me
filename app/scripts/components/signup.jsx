var React = require('react');

var NavComponent = require('./login.jsx').NavComponent;
var User = require('../models/users').User;


var SignupComponent = React.createClass({
  signup: function(e){
    e.preventDefault();
    var email = jQuery('#signup-email').val();
    var username = jQuery('#signup-username').val();
    var password = jQuery('#signup-password').val();
    var self = this;

    var newUser = new User();
    newUser.set({'email': email, 'username': username, 'password': password});

    newUser.save().done(function(){
      self.props.router.navigate('login/', {trigger: true})
    }).fail(function(){
      alert('An account associated with that e-mail address or username already exists.')
    });
  },

  render: function(){
    return (
      <NavComponent>
        <div className="row">
          <div className="signup-form-container col-sm-offset-3 col-sm-6">
            <h1 className="login-title">Create Account</h1>
            <form onSubmit={this.signup} className="form-horizontal">
              <div className="form-group">
                <label htmlFor="signup-email" className="col-sm-1 control-label">Email</label>
                <div className="col-sm-11">
                  <input type="email" className="form-control" id="signup-email" placeholder="Email"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="signup-username" className="col-sm-1 control-label">Username</label>
                <div className="col-sm-11">
                  <input type="text" className="form-control" id="signup-username" placeholder="Username"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="signup-password" className="col-sm-1 control-label">Password</label>
                <div className="col-sm-11">
                  <input type="password" className="form-control" id="signup-password" placeholder="Password"/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-1 col-sm-11">
                  <button type="submit" className="btn btn-primary">Create Account</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </NavComponent>
    )
  }
});

module.exports = {
  'SignupComponent': SignupComponent
}
