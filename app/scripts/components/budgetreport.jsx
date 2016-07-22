var React = require('react');

var NavComponent = require('./login.jsx').NavComponent;
var Budget = require('../models/budget').Budget;
var BudgetCollection = require('../models/budget').BudgetCollection;
var NavBarComponent = require('./main.jsx').NavBarComponent;
var IncomeCollection = require('../models/income').IncomeCollection;


var BudgetReportComponent = React.createClass({
  getInitialState: function(){
    return {
      budgetCollection: [],
    }
  },

  componentWillMount: function(){
    var self = this;
    var budgetCollection = new BudgetCollection();
    budgetCollection.fetch().done(function(){
      self.setState({budgetCollection: budgetCollection});
      //console.log('state', budgetCollection);
    });
  },

  render: function(){
    var budgets = this.state.budgetCollection;
    //console.log('budgets', budgets);
    var budget = budgets.map(function(budgetItem, index){
      var budgetIncome = (budgetItem.get('income'));
      var budgetExpense = (budgetItem.get('expense'));

      var income = budgetIncome.map(function(incomeItem, index){
        console.log('income', income);
        return (
          <div key={index} className="row">
            <span className="col-sm-3">{incomeItem.type}</span>
            <span className="col-sm-3">${incomeItem.amount}</span>
          </div>
        )
      });

      var expense = budgetExpense.map(function(expenseItem, index){
        console.log('expense', expenseItem);
        return (
          <div key={index} className="row">
            <span className="col-sm-3">{expenseItem.type}</span>
            <span className="col-sm-3">${expenseItem.amount}</span>
          </div>
        )
      });

      return (
        <div>
          <h2>Income</h2>
          {income}
          <h2>Expense</h2>
          {expense}
        </div>
      )
    });

    return (
      <NavComponent>
        <NavBarComponent/>
        <div>
            {budget}
        </div>
      </NavComponent>
    )
  }
});

module.exports = {
  'BudgetReportComponent': BudgetReportComponent
};
