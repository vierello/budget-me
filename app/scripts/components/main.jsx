var React = require('react');

var NavComponent = require('./login.jsx').NavComponent;
var Actual = require('../models/actual').Actual;
var ActualCollection = require('../models/actual').ActualCollection;


var ActualInputComponent = React.createClass({
  handleType: function(e){
    this.props.actualExpense.set('type', e.target.value);
  },

  handleAmount: function(e){
    this.props.actualExpense.set('amount', parseFloat(e.target.value));
  },

  handleDescription: function(e){
    this.props.actualExpense.set('description', e.target.value);
  },

  handleSubmit: function(e){
    e.preventDefault();
    var self = this;
    this.props.actualExpense.save();
  },

  render: function(){
    return (
      <div className="row">
        <form onSubmit={this.handleSubmit} className="col-md-4 well col-xs-12">
            <h2 className="actual-title well">Actual Expense</h2>
            <div className="actual-input col-md-8 col-xs-8">
              <select onChange={this.handleType} className="actual-expense-input form-control">
                <option>Please Choose</option>
                <option>Mortgage/Rent</option>
                <option>Health Insurance</option>
                <option>Car Payment</option>
                <option>Credit Card</option>
                <option>Gas</option>
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
              <input onChange={this.handleAmount} type="number" className="actual-expense-box" min="0.01" step="0.01" placeholder="Expense"/>
            </div>
            <div>
              <textarea onChange={this.handleDescription} type="text" className="actual-note col-xs-12" rows="2" placeholder="Describe Transaction"/>
            </div>
          <div className="row">
            <div className="add-view-buttons col-xs-12">
              <input type="submit" className="pull-left btn btn-success" value="Add Expense"/>
              <a href="#actuallist/"><input className="pull-right btn btn-primary" value="View Expenses"/></a>
            </div>
          </div>
        </form>
      </div>

    )
  }
});

var NavBarComponent = React.createClass({
  render: function(){
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
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
              <li><a className="nav-links" href="#main/">Home<span className="sr-only">(current)</span></a></li>
              <li><a className="nav-links" href="#createbudget/">Create Budget</a></li>
              <li><a className="nav-links" href="#budgetreport/">Budget Report</a></li>
              <li><a className="nav-links" href="#creategoal/">Goals</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
});

var MainComponent = React.createClass({
  getInitialState: function(){
      return {
        actual: new Actual()
      }
  },

  render: function(){
    return (
      <NavComponent>
        <NavBarComponent/>
        <div className="row">
          <div className="col-md-offset-1 col-md-10">
            <div>
              Welcome {localStorage.getItem('username')}
            </div>
            <ActualInputComponent actualExpense={this.state.actual}/>
          </div>
        </div>
      </NavComponent>
    )
  }

});

module.exports = {
  'MainComponent': MainComponent,
  'NavBarComponent': NavBarComponent
}
