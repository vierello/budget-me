var React = require('react');

var NavComponent = require('./login.jsx').NavComponent;
var Budget = require('../models/budget').Budget;
var BudgetCollection = require('../models/budget').BudgetCollection;
var NavBarComponent = require('./main.jsx').NavBarComponent;
var IncomeCollection = require('../models/income').IncomeCollection;


var BudgetIncomeComponent = React.createClass({
  render: function(){
    var budgets = this.props.budgetCollection;
    var budget = budgets.map(function(budgetItem, index){

      var budgetIncome = budgetItem.get('income');
      var income = budgetIncome.map(function(incomeItem, index){
        return (
          <div key={index} className="row">
            <span className="col-sm-3">{incomeItem.type}</span>
            <span className="col-sm-3">${(incomeItem.amount).toFixed(2)}</span>
          </div>
        )
      });
      return(
        <div key={index}>
          {income}
        </div>
      )
    });
    return (
      <div>
        <div className="row">
          <h4 className="col-sm-3">Type</h4>
          <h4 className="col-sm-3">Budget</h4>
        </div>
        {budget}
      </div>
    )
  }
});

var BudgetExpenseComponent = React.createClass({
  render: function(){
    var budgets = this.props.budgetCollection;
    var budget = budgets.map(function(budgetItem, index){

      var budgetExpense = budgetItem.get('expense');
      var expense = budgetExpense.map(function(expenseItem, index){
        return (
          <div key={index} className="row">
            <span className="col-sm-3">{expenseItem.type}</span>
            <span className="col-sm-3">${(expenseItem.amount).toFixed(2)}</span>
          </div>
        )
      });
      return(
        <div key={index}>
          {expense}
        </div>
      )
    });
    return (
      <div>
        <div className="row">
          <h4 className="col-sm-3">Type</h4>
          <h4 className="col-sm-3">Budget</h4>
        </div>
        {budget}
      </div>
    )
  }
});

var TotalIncomeComponent = React.createClass({
  render: function(){
    var incomes = [];
    var budgets = this.props.budgetCollection;
    //console.log(budgets);
    var budget = budgets.map(function(budgetItem, index){

      var incomeTotal = budgetItem.get('income').map(function(incomeItem, index){
        var incomeincome = incomeItem.amount;
        return incomes.push(incomeincome)
      });
      //console.log(incomes);

      var totalIncome = incomes.reduce(function(previousValue, currentValue, index){
        var income = previousValue + currentValue
        return income
      });
      //console.log(totalIncome);
      return(
        <div key={index}>
          ${totalIncome.toFixed(2)}
        </div>
      )
    });
    return(
      <div className="row">
        <span className="col-sm-3">Total</span>
        <div className="col-sm-3">{budget}</div>
      </div>
    )
  }
});

var TotalExpenseComponent = React.createClass({
  render: function(){
    var expenses = [];
    var budgets = this.props.budgetCollection;
    //console.log(budgets);
    var budget = budgets.map(function(budgetItem, index){

      var expenseTotal = budgetItem.get('expense').map(function(expenseItem, index){
        var expenseexpense = expenseItem.amount;
        return expenses.push(expenseexpense)
      });
      //console.log(incomes);

      var totalExpense = expenses.reduce(function(previousValue, currentValue, index){
        var expense = previousValue + currentValue
        return expense
      });
      //console.log(totalExpense);
      return(
        <div key={index}>
          ${totalExpense.toFixed(2)}
        </div>
      )
    });
    return(
      <div className="row">
        <span className="col-sm-3">Total</span>
        <div className="col-sm-3">{budget}</div>
      </div>
    )
  }
});

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
    // var budgets = this.state.budgetCollection;
    // var budget = budgets.map(function(budgetItem, index){
    //
    //   var budgetIncome = budgetItem.get('income');
    //   var income = budgetIncome.map(function(incomeItem, index){
    //     console.log('incomes', incomeItem);
    //     return (
    //       <div key={index} className="row">
    //         <span className="col-sm-3">{incomeItem.type}</span>
    //         <span className="col-sm-3">${incomeItem.amount}</span>
    //       </div>
    //     )
    //   });
    //
    //   var budgetExpense = budgetItem.get('expense');
    //   var expense = budgetExpense.map(function(expenseItem, index){
    //     console.log('expenses', expenseItem);
    //     return (
    //       <div key={index} className="row">
    //         <span className="col-sm-3">{expenseItem.type}</span>
    //         <span className="col-sm-3">${expenseItem.amount}</span>
    //       </div>
    //     )
    //   });

    return (
      <NavComponent>
        <NavBarComponent/>
        <div className="row">
          <div className="col-md-offset-1 col-md-10">
            <h2>Income</h2>
            <BudgetIncomeComponent budgetCollection={this.state.budgetCollection}/>
            <br/>
            <TotalIncomeComponent budgetCollection={this.state.budgetCollection}/>
            <h2>Expense</h2>
            <BudgetExpenseComponent budgetCollection={this.state.budgetCollection}/>
            <br/>
            <TotalExpenseComponent budgetCollection={this.state.budgetCollection}/>
          </div>
        </div>
      </NavComponent>
    )
  }
});

module.exports = {
  'BudgetReportComponent': BudgetReportComponent
};
