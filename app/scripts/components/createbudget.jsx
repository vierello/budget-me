var React = require('react');

var NavComponent = require('./login.jsx').NavComponent;
var BudgetCollection = require('../models/budget').BudgetCollection;
var Budget = require('../models/budget').Budget;


var BudgetIncome = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="well income-section col-sm-12">
          <h3 className="income-header">Income</h3>
          <button className="pull-right btn btn-success">Add Item</button>
          <div className="form-group">


          </div>
        </div>
      </div>
    )
  }
});

var BudgetExpense = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="well col-sm-12">
          <h3>Expenses</h3>
        </div>
      </div>
    )
  }
})

var CreateBudgetComponent = React.createClass({
  createBudget: function(){

  },

  render: function(){
    return (
      <NavComponent>
        <div className="row">
          <div className="col-sm-offset-2 col-sm-8 create-budget-container">
            <form onSubmit={this.createBudget} className="form-horizontal">
              <BudgetIncome/>
              <BudgetExpense/>
            </form>
          </div>
        </div>
      </NavComponent>

    )
  }
});

module.exports = {
  'CreateBudgetComponent': CreateBudgetComponent
}
