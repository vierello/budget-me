var React = require('react');

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
    var user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    this.props.actualExpense.setPointer('user', user, '_User');
    console.log(this.props.actualExpense);
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
              <button type="submit" className="pull-left btn btn-success">Add Expense</button>
              <a href="#actuallist/" className="pull-right btn btn-primary">View Expenses</a>
            </div>
          </div>
        </form>
      </div>

    )
  }
});

var NavComponent = React.createClass({
  render: function(){
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="nav-sidebar col-md-2">
                <header className="app-header">
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
                        <li><a className="nav-links" href="#main/">Home<span className="sr-only">(current)</span></a></li>
                        <li><a className="nav-links" href="#createbudget/">Create Budget</a></li>
                        <li><a className="nav-links" href="#budgetreport/">Budget Report</a></li>
                        <li><a className="nav-links" href="#creategoal/">Goals</a></li>
                        <li><a className="nav-links" href="#profile/">Profile</a></li>
                      </ul>
                    </div>
                  </div>
                </nav>
                {// <footer className="app-footer">
                //   <span className="created-by">Created by ACJ Engineering, Inc.</span>
                //   <ul>
                //     <li className="social-media-links"><a href="#"><i className="fa fa-facebook-official"></i></a></li>
                //     <li className="social-media-links"><a href="#"><i className="fa fa-twitter-square"></i></a></li>
                //     <li className="social-media-links"><a href="#"><i className="fa fa-youtube-square"></i></a></li>
                //   </ul>
                // </footer>
                }
              </div>
              <div className="col-md-10 children-container">
                {this.props.children}
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
        actual: new Actual()
      }
  },

  render: function(){
    return (
      <NavComponent>
        <div className="row">
          <div className="main-page-layout col-md-offset-1 col-md-10">
            <div>
              <h1 className="well main-page-heading">{localStorage.getItem('username')}&#8217;<span className='s'>s</span> Home Page</h1>
            </div>
            <ActualInputComponent actualExpense={this.state.actual}/>
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
