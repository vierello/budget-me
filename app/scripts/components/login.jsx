var React = require('react');
var Backbone = require('backbone');

var User = require('../models/users').User;

var App = React.createClass({
    getInitialState: function() {
        return {
            flipped: false
        };
    },

    flip: function() {
        this.setState({ flipped: !this.state.flipped });
        jQuery('audio').attr({src: 'images/198877__bone666138__coin-flip.wav'});
    },

    render: function() {
        return (
          <div>
            <Flipper flipped={this.state.flipped} flip={this.flip} router={this.props.router} orientation="horizontal" />
          </div>
        )
    }
});

var Flipper = React.createClass({
    render: function() {
      console.log(this.props);
        return (
          <div className={"flipper-container " + this.props.orientation}>
            <div className={"flipper" + (this.props.flipped ? " flipped" : "")}>
                <Front router={this.props.router} flip={this.props.flip}><LoginComponent router={this.props.router} flip={this.props.flip}/></Front>
                <Back router={this.props.router} flip={this.props.flip}><SignupComponent router={this.props.router} flip={this.props.flip}/></Back>
            </div>
          </div>
        )
    }
});

var Front = React.createClass({
    render: function() {
        return (
          <div className="front tile">{this.props.children}</div>
        )
    }
});

var Back = React.createClass({
    render: function() {
        return (
          <div className="back tile">{this.props.children}</div>
        )
    }
});

var LoginComponent = React.createClass({
  userLogin: function(e){
    console.log(this.props);
    //console.log('test');
      e.preventDefault();
      var username = jQuery('#inputUsername1').val();
      var password = jQuery('#inputPassword1').val();
      var self = this;

      User.login(username, password, {
        success: function(response){
        self.props.router.navigate('main/', {trigger: true});
        //console.log(response);
        },
        fail: function(response){
          alert('That username or password does not match our records. Please try again.')
        }
      });
      localStorage.setItem('username', username)
  },

  render: function(){
    var self = this;
    return (
      <div className="row">
        <div className="login-form-container well col-xs-offset-2 col-xs-8">
          <form onSubmit={this.userLogin} className="form-horizontal">
            <header className="app-login-header">
              <h1>Budget Me</h1>
              <h2 className="login-title well col-xs-12">Log In</h2>
            </header>
            <div className="login-form form-group">
              <label htmlFor="inputUsername1" className="col-xs-2 control-label">Username</label>
              <div className="col-xs-10 control-input form-group">
                <input type="text" className="control-input form-control" id="inputUsername1" placeholder="Username"/>
              </div>
              <label htmlFor="inputPassword1" className="col-xs-2 control-label">Password</label>
              <div className="control-input col-xs-10 form-group">
                <input type="password" className="control-input form-control" id="inputPassword1" placeholder="Password"/>
              </div>
            </div>
            <div className="check-box checkbox">
              <label>
                <input type="checkbox"/> <p className="remember-me">Remember me</p>
              </label>
            </div>
            <div className="form-group">
              <div className="col-xs-offset-1 col-xs-10">
                <button type="submit" className="col-xs-5 btn button-color btn-primary">Sign In</button>
                <div className="col-xs-2 or">or</div>
                <button onClick={this.props.flip} type="button" className="col-xs-5 btn button-color btn-primary">Create Account</button>
                <audio className="coin-flip" src="" autoPlay></audio>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
});

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
      <div className="row">
        <div className="signup-form-container well col-sm-offset-2 col-sm-8">
          <form onSubmit={this.signup} className="form-horizontal">
            <header className="app-login-header">
              <h1>Budget Me</h1>
            </header>
            <h1 className="well login-title">Create Account</h1>
            <div className="form-group">
              <label htmlFor="signup-email" className="col-xs-2 control-label">Email</label>
              <div className="col-xs-10 form-group">
                <input type="email" className="signup-input form-control" id="signup-email" placeholder="Email"/>
              </div>
              <label htmlFor="signup-username" className="col-xs-2 control-label">Username</label>
              <div className="col-xs-10 form-group">
                <input type="text" className="signup-input form-control" id="signup-username" placeholder="Username"/>
              </div>
              <label htmlFor="signup-password" className="col-xs-2 control-label">Password</label>
              <div className="col-xs-10 form-group">
                <input type="password" className="signup-input form-control" id="signup-password" placeholder="Password"/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-offset-2 col-xs-8">
                <button onClick={this.props.flip} type="submit" className="btn pull-left button-color btn-primary">Create Account</button>
                <button onClick={this.props.flip} type="button" className="btn button-color pull-right btn-primary">Back To Login</button>
                <audio className="coin-flip" src="" autoPlay></audio>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
});


module.exports = {
  'App': App,
  'LoginComponent': LoginComponent,
  'SignupComponent': SignupComponent
}
