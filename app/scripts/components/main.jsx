var React = require('react');

var Actual = require('../models/actual').Actual;
//var ActualCollection = require('../models/actual').ActualCollection;
var GoalProgress = require('../models/goalprogress').GoalProgress;
var GoalCollection = require('../models/goals').GoalCollection;
var User = require('../models/users').User;
var BudgetReportComponent = require('./budgetreport.jsx').BudgetReportComponent;
var DisplayGoalComponent = require('./displaygoal.jsx').DisplayGoalComponent;


var GoalInputComponent = React.createClass({
  getInitialState: function (){
    return {
      'name': '',
      'amount': 0
    }
  },

  componentWillMount: function(){
    var self = this;
    this.props.goalCollection.fetch().done(function(){
      self.forceUpdate();
    });
  },

  handleType: function(e){
    this.setState({'name': e.target.value});
  },

  handleAmount: function(e){
    this.setState({'amount': parseFloat(e.target.value)});
  },

  handleSubmit: function(e){
    e.preventDefault();
    var self = this;
    var goalProgress = new GoalProgress();
    var user = JSON.parse(localStorage.getItem('user'));
    //console.log(user);
    goalProgress.set('name', this.state.name);
    goalProgress.set('amount', this.state.amount)
    goalProgress.setPointer('user', user, '_User');
    //console.log(this.props.goalProgress);
    goalProgress.save().done(function(){
      self.setState({
        'name': '',
        'amount': ''
      });
      self.forceUpdate();
    });
  },

  render: function(){
    var goals = this.props.goalCollection;
    var goalItem = goals.map(function(goal, index){
      //console.log(goal);
      return (
        <option key={index}>{goal.get('name')}</option>
      )
    });
    //console.log(goals);
    return (
      <div className="row">
        <form onSubmit={this.handleSubmit} className="col-md-12 well col-xs-12">
            <h2 className="goal-progress-title well">Goal Contribution</h2>
            <div className="goals-input col-md-8 col-xs-8">
              <select onChange={this.handleType} className="goal-progress-input form-control" value={this.state.name}>
                <option className="default">Please Choose</option>
                {goalItem}
              </select>
            </div>
            <div className="goals-input col-md-4 col-xs-4">
              <input onChange={this.handleAmount} type="number" className="goal-progress-box" min="0.01" step="0.01" placeholder="Expense" value={this.state.amount}/>
            </div>
          <div className="row">
            <div className="add-view-buttons col-xs-12">
              <button type="submit" className="pull-left btn btn-success">Add Progress</button>
              <a href="#creategoal/" className="pull-right view-button btn btn-primary">View Goals</a>
            </div>
          </div>
        </form>
      </div>
    )
  }
});

var ActualInputComponent = React.createClass({
  getInitialState: function() {
    return {
      'type': "",
      'amount': 0,
      'description': ""
    }
  },
  handleType: function(e){
    this.setState({'type': e.target.value});
  },

  handleAmount: function(e){
    this.setState({'amount': parseFloat(e.target.value)});
  },

  handleDescription: function(e){
    this.setState({'description': e.target.value});
  },

  handleSubmit: function(e){
    e.preventDefault();
    var actualExpense = new Actual();
    var self = this;
    var user = JSON.parse(localStorage.getItem('user'));
    //console.log(user);
    actualExpense.set('type', this.state.type);
    actualExpense.set('amount', this.state.amount);
    actualExpense.set('description', this.state.description);
    actualExpense.setPointer('user', user, '_User');
    actualExpense.save().done(function(){
      self.setState({
        'type': '',
        'amount': '',
        'description': ''
      });
      self.forceUpdate();
    });

  },

  render: function(){
    return (
      <div className="row">
        <form onSubmit={this.handleSubmit} className="col-md-12 well col-xs-12">
            <h2 className="actual-title well">Actual Expense</h2>
            <div className="actual-input col-md-8 col-xs-8">
              <select onChange={this.handleType} className="actual-expense-input form-control" value={this.state.type}>
                <option className="default">Please Choose</option>
                <option>Mortgage/Rent</option>
                <option>Health Insurance</option>
                <option>Car Payment</option>
                <option>Credit Card</option>
                <option>Natural Gas</option>
                <option>Electric</option>
                <option>Cell Phone</option>
                <option>Cable</option>
                <option>Student Loan</option>
                <option>Car Insurance</option>
                <option>Groceries</option>
                <option>Water</option>
                <option>Garbage</option>
                <option>Subscription</option>
                <option>Fuel</option>
                <option>Other</option>
              </select>
            </div>
            <div className="actual-input col-md-4 col-xs-4">
              <input onChange={this.handleAmount} type="number" className="actual-expense-box" min="0.01" step="0.01" placeholder="Expense" value={this.state.amount}/>
            </div>
            <div>
              <textarea onChange={this.handleDescription} type="text" className="actual-note col-xs-12" rows="2" placeholder="Describe Transaction" value={this.state.description}/>
            </div>
          <div className="row">
            <div className="add-view-buttons col-xs-12">
              <button type="submit" className="pull-left btn btn-success">Add Expense</button>
              <a href="#actuallist/" className="pull-right view-button btn btn-primary">View Expenses</a>
            </div>
          </div>
        </form>
      </div>
    )
  }
});

var ProfileDisplayComponent = React.createClass({
  handleSignOut: function(){
    localStorage.clear();
  },

  render: function(){
    var user = JSON.parse(localStorage.getItem('user'));
    //console.log('user', user);

    return (
      <div className="row">
        <div className="profile-display col-xs-12">
          <div className="profile-display-heading">
            <img className="profile-image" src={user.profileImage}/>
            <h1 className="main-page-heading">{user.username}</h1>
          </div>
          <div className="profile-sign-out">
            <a href="#login/" className="main-page-sign-out"><span onClick={this.handleSignOut}>Sign Out</span></a>
          </div>
        </div>
      </div>
    )
  }
});

var NavComponent = React.createClass({
  render: function(){
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <div className="row main-row">
              <div className="nav-blue-box"></div>
              <div className="nav-sidebar col-md-2 col-xs-12">
                <header className="well nav-header">
                  <h1>Budget</h1>
                  <h1>Me</h1>
                </header>
                <nav className="navbar navbar-default">
                  <div className="navbar-container container-fluid">
                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                    </div>
                    <div className="nav-style collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav">
                        <li>
                          <a className="nav-links" href="#main/">
                            <i className="icon fa fa-home fa-3x" aria-hidden="true"></i>
                            <span className="icon">Home</span><span className="sr-only">(current)</span>
                          </a>
                        </li>
                        <li>
                          <a className="nav-links" href="#createbudget/">
                            <i className="icon fa fa-balance-scale fa-3x" aria-hidden="true"></i>
                            <span className="icon">Create Budget</span>
                          </a>
                        </li>
                        <li>
                          <a className="nav-links" href="#budgetreport/">
                            <i className="icon fa fa-file-text-o fa-3x" aria-hidden="true"></i>
                            <span className="icon">Budget Report</span>
                          </a>
                        </li>
                        <li>
                          <a className="nav-links" href="#creategoal/">
                            <i className="icon fa fa-trophy fa-3x" aria-hidden="true"></i>
                            <span className="icon">Goals</span>
                          </a>
                        </li>
                        <li>
                          <a className="nav-links" href="#profile/">
                            <i className="icon fa fa-user fa-3x" aria-hidden="true"></i>
                            <span className="icon">Profile</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
                <footer className="app-footer">
                  <span className="created-by">Created by ACJ Engineering</span>
                  <ul className="social-media">
                    <li className="social-media-links"><a href="https://www.facebook.com/vitello1"><i className="fa fa-facebook-official fa-2x"></i></a></li>
                    <li className="social-media-links"><a href="https://twitter.com/vierello"><i className="fa fa-twitter-square fa-2x"></i></a></li>
                    <li className="social-media-links"><a href="#"><i className="fa fa-youtube-square fa-2x"></i></a></li>
                  </ul>
                </footer>
              </div>
              <div className="col-md-10 col-xs-12">
                <ProfileDisplayComponent router={this.props.router}/>
                <div className="children-container">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

var MainComponent = React.createClass({
  getInitialState: function(){
      return {
        goals: new GoalCollection()
      }
  },

  render: function(){
    return (
      <NavComponent router={this.props.router}>
        <div className="row">
          <div className="col-md-offset-1 col-md-10 col-xs-12 dash-well-color well">
            <p className="dashboard-header"></p>
            <div className="col-md-5 col-xs-12">
              <ActualInputComponent/>
            </div>
            <div className=" col-md-offset-1 col-md-5 col-xs-12">
              <GoalInputComponent goalCollection={this.state.goals}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-offset-1 col-md-10 col-xs-12 dashboard-padding">
            <div className="col-md-7 col-sm-12 col-xs-12 dash-well-color well">
              <p className="dashboard-header">Budget Report</p>
              <BudgetReportComponent/>
            </div>
            <div className="col-md-5 col-sm-12 col-xs-12 dash-well-color well">
              <p className="dashboard-header">Goals</p>
              <DisplayGoalComponent/>
            </div>
          </div>
        </div>
      </NavComponent>
    )
  }

});

module.exports = {
  'NavComponent': NavComponent,
  'MainComponent': MainComponent,
}
