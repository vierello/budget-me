var React = require('react');
var $ = require('jquery');
var Backbone = require('backbone');

var User = require('../models/users').User;

var LoginComponent = React.createClass({
  userLogin: function(e){
    //console.log('test');
      e.preventDefault();
      var username = $('#username').val();
      var password = $('#password').val();
      var self = this;

      var loggedInUser = User.login(username, password);
      localStorage.setItem('username', username)

      loggedInUser.done(function(response){
        //console.log(username);
        self.props.router.navigate('main/', {trigger: true})

      }).fail(function(){

      });
  },

  render: function(){
    return (
      <NavComponent>
        <div className="row">
          <div className="login-form-container col-sm-offset-3 col-sm-6">
            <form onSubmit={this.userLogin} className="form-horizontal">
              <h2 className="login-title col-sm-12">Log In</h2>
              {// <div className="form-group">
              //   <label htmlFor="inputEmail1" className="col-sm-1 control-label">Email</label>
              //   <div className="col-sm-11">
              //     <input type="email" className="form-control" id="inputEmail1" placeholder="Email"/>
              //   </div>
              // </div>
              }
              <div className="form-group">
                <label htmlFor="inputUsername1" className="col-sm-1 control-label">Username</label>
                <div className="col-sm-11">
                  <input type="text" className="form-control" id="inputUsername1" placeholder="Username"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword1" className="col-sm-1 control-label">Password</label>
                <div className="col-sm-11">
                  <input type="password" className="form-control" id="inputPassword1" placeholder="Password"/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-1 col-sm-11">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox"/> Remember me
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-1 col-sm-11">
                  <button type="submit" className="btn btn-default">Sign In</button>
                </div>
              </div>
            </form>
            <div className="col-sm-offset-1 col-sm-11 create-account-button">
              <div>or</div>
              <br/>
              <a href="#signup/"><button className="btn btn-default">Create Account</button></a>
            </div>
          </div>
        </div>
      </NavComponent>
    )
  }
});

var NavComponent = React.createClass({
  render: function(){
    return (
      <div>
        <div className="row">
          <header className="app-header">
            <h1>Budget Me</h1>
          </header>
        </div>
        <div className="children-container">
          {this.props.children}
        </div>
        <div className="row">
          <footer className="col-sm-12 app-footer">
            <span className="created-by">Created by ACJ Engineering, Inc.</span>
            <ul>
              <li className="social-media-links"><a href="#"><i className="fa fa-facebook-official" aria-hidden="true"></i></a></li>
              <li className="social-media-links"><a href="#"><i className="fa fa-twitter-square" aria-hidden="true"></i></a></li>
              <li className="social-media-links"><a href="#"><i className="fa fa-youtube-square" aria-hidden="true"></i></a></li>
            </ul>
          </footer>
        </div>
      </div>
    )
  }
});

module.exports = {
  'LoginComponent': LoginComponent,
  'NavComponent': NavComponent
}
