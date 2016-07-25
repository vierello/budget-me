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


var Router = Backbone.Router.extend({
  routes: {
    '': 'login',
    'login/': 'login',
    'signup/': 'signup',
    'main/': 'main',
    'createbudget/': 'createBudget',
    'budgetreport/': 'budgetReport',
    'creategoal/': 'createGoal',
    'actuallist/': 'actualList'
  },

  login: function(){
    ReactDOM.render(
      React.createElement(LoginComponent, {router: this}),
      document.getElementById('container')
    )
  },

  signup: function(){
    ReactDOM.render(
      React.createElement(SignupComponent, {router: this}),
      document.getElementById('container')
    )
  },

  main: function(){
    ReactDOM.render(
      React.createElement(MainComponent, {router: this}),
      document.getElementById('container')
    )
  },

  createBudget: function(){
    ReactDOM.render(
      React.createElement(CreateBudgetComponent, {router: this}),
      document.getElementById('container')
    )
  },

  budgetReport: function(){
    ReactDOM.render(
      React.createElement(BudgetReportComponent, {router: this}),
      document.getElementById('container')
    )
  },

  createGoal: function(){
    ReactDOM.render(
      React.createElement(CreateGoalComponent, {router: this}),
      document.getElementById('container')
    )
  },

  actualList: function(){
    ReactDOM.render(
      React.createElement(ActualListComponent, {router: this}),
      document.getElementById('container')
    )
  }
});

var router = new Router();

module.exports = router;
