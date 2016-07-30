var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var LoginComponent = require('./components/login.jsx').LoginComponent;
var SignupComponent = require('./components/signup.jsx').SignupComponent;
var CreateBudgetComponent = require('./components/createbudget.jsx').CreateBudgetComponent;
var MainComponent = require('./components/main.jsx').MainComponent;
var BudgetReportComponent = require('./components/budgetreport.jsx').BudgetReportComponent;
var CreateGoalComponent = require('./components/creategoal.jsx').CreateGoalComponent;
var ActualListComponent = require('./components/actuallist.jsx').ActualListComponent;
var ProfileComponent = require('./components/profile.jsx').ProfileComponent;
var User = require('./models/users').User;
var App = require('./components/login.jsx').App;


var Router = Backbone.Router.extend({
  routes: {
    '': 'login',
    'login/': 'login',
    'signup/': 'signup',
    'main/': 'main',
    'createbudget/': 'createBudget',
    'budgetreport/': 'budgetReport',
    'creategoal/': 'createGoal',
    'actuallist/': 'actualList',
    'profile/': 'profile'
  },

  initialize: function(){
    if(User.isLoggedIn()){
      var currentUser = User.restore();
    }
  },

  login: function(){
    ReactDOM.render(
      React.createElement(App, {router: this}),
      document.getElementById('container')
    )
    jQuery('#container').addClass('wrapper-login');
    jQuery('#container').removeClass('wrapper-main');
  },

  signup: function(){
    ReactDOM.render(
      React.createElement(SignupComponent, {router: this}),
      document.getElementById('container')
    )
    jQuery('#container').addClass('wrapper-login');
    jQuery('#container').removeClass('wrapper-main');
  },

  main: function(){
    ReactDOM.render(
      React.createElement(MainComponent, {router: this}),
      document.getElementById('container')
    )
    jQuery('#container').addClass('wrapper-main');
    jQuery('#container').removeClass('wrapper-login');
  },

  createBudget: function(){
    ReactDOM.render(
      React.createElement(CreateBudgetComponent, {router: this}),
      document.getElementById('container')
    )
    jQuery('#container').addClass('wrapper-main');
    jQuery('#container').removeClass('wrapper-login');
  },

  budgetReport: function(){
    ReactDOM.render(
      React.createElement(BudgetReportComponent, {router: this}),
      document.getElementById('container')
    )
    jQuery('#container').addClass('wrapper-main');
    jQuery('#container').removeClass('wrapper-login');
  },

  createGoal: function(){
    ReactDOM.render(
      React.createElement(CreateGoalComponent, {router: this}),
      document.getElementById('container')
    )
    jQuery('#container').addClass('wrapper-main');
    jQuery('#container').removeClass('wrapper-login');
  },

  actualList: function(){
    ReactDOM.render(
      React.createElement(ActualListComponent, {router: this}),
      document.getElementById('container')
    )
    jQuery('#container').addClass('wrapper-main');
    jQuery('#container').removeClass('wrapper-login');
  },

  profile: function(){
    ReactDOM.render(
      React.createElement(ProfileComponent, {router: this}),
      document.getElementById('container')
    )
    jQuery('#container').addClass('wrapper-main');
    jQuery('#container').removeClass('wrapper-login');
  }
});

var router = new Router();

module.exports = router;
