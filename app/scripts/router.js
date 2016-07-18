var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    '': 'login',
    'login/': 'login',
    'signup/': 'signup',
    'main/': 'main',
    'createbudget/': 'createBudget',
    'budgetreport/': 'budgetReport',
    'creategoal': 'createGoal'
  },

  login: function(){
    ReactDOM.render(
      React.createElement(LoginComponent),
      document.getElementById('container')
    )
  },

  signup: function(){
    ReactDOM.render(
      React.createElement(SignupComponent),
      document.getElementById('container')
    )
  },

  main: function(){
    ReactDOM.render(
      React.createElement(MainComponent),
      document.getElementById('container')
    )
  },

  createBudget: function(){
    ReactDOM.render(
      React.createElement(CreateBudgetComponent),
      document.getElementById('container')
    )
  },

  budgetReport: function(){
    ReactDOM.render(
      React.createElement(BudgetReportComponent),
      document.getElementById('container')
    )
  },

  createGoal: function(){
    ReactDOM.render(
      React.createElement(CreateGoalComponent),
      document.getElementById('container')
    )
  }
});

var router = new Router();

module.exports = router;
