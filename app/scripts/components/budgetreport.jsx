var React = require('react');
var _ = require('underscore');

var NavComponent = require('./main.jsx').NavComponent;
var Budget = require('../models/budget').Budget;
var BudgetCollection = require('../models/budget').BudgetCollection;
var IncomeCollection = require('../models/income').IncomeCollection;
var ActualCollection = require('../models/actual').ActualCollection;
var Actual = require('../models/actual').Actual;


var TotalIncomeComponent = React.createClass({

  render: function(){
    var budgetIncome = this.props.totalBudgetIncome;
    //console.log(budgetIncome);
    var self = this;
    var budget = this.props.budget;

    var totalIncome = budget.get('income').reduce(function(previousValue, currentValue, index){
      previousValue += currentValue.amount;
      return previousValue
    }, 0);

    return(
      <div className="row">
        <span className="col-xs-2">Total</span>
        <div className="col-xs-2">{accounting.formatMoney(totalIncome)}</div>
      </div>
    )
  }
});

var TotalExpenseComponent = React.createClass({
  render: function(){
    var budget = this.props.budget;

    var totalExpense = budget.get('expense').reduce(function(previousValue, currentValue, index){
      previousValue += currentValue.amount;
      return previousValue;
    }, 0);

    return(
      <div className="row">
        <span className="col-xs-2">Total</span>
        <div className="col-xs-2">{accounting.formatMoney(totalExpense)}</div>
      </div>
    )
  }
});

var BudgetReportComponent = React.createClass({
  getInitialState: function(){
    return {
      budget: new Budget(),
      actual: [],
      totalBudgetIncome: 0,
      totalBudgetExpense: 0
    }
  },

  componentWillMount: function(){
    var self = this;
    var budgetCollection = new BudgetCollection();
    var budgetPromise = budgetCollection.fetch()

    var actualCollection = new ActualCollection();
    var actualPromise = actualCollection.fetch()

    Promise.all([budgetPromise, actualPromise]).then(function(){
       //console.log(budgetPromise);
       //console.log(actualPromise);

       //console.warn(actualCollection);
       //console.warn(budgetCollection[0]);

      self.setState({
        budget: budgetCollection.first(),
        actual: actualCollection
      });
    });
  },

  calcActuals: function(budget){
    //console.log(this.state.totalBudgetIncome);
    var actuals = this.state.actual;
    //console.log(actuals);
    _.each(budget, function(budgetItem){
      //console.log(actuals.where({'type': budgetItem.type}).length);
      //console.log({'type': budgetItem.type});
      var actualsSum = actuals.where({'type': budgetItem.type}).reduce(function(memo, actual){
        // console.log(actual.get('amount'));
        return memo + actual.get('amount');
      }, 0);

      budgetItem.actual = actualsSum
      // console.log(budgetItem);
    });
  },

  render: function(){
    //console.log(this.state.actual);
    var incomeBudget = this.state.budget.get('income');
    var expenseBudget = this.state.budget.get('expense');
    //console.log(expenseBudget);
    this.calcActuals(incomeBudget);
    this.calcActuals(expenseBudget);
    //console.log(expenseBudget);



    var incomeItems = incomeBudget.map(function(income, index){
      function incomeSurplusDeficit(){
        if((income.amount - income.actual) > 0){
          return (
            <span className="surplus col-xs-2">{accounting.formatMoney(income.amount - income.actual)}</span>
          )
        }else if((income.amount - income.actual) < 0){
          return(
            <span className="deficit col-xs-2">{accounting.formatMoney(income.amount - income.actual)}</span>
          )
        }else{
          return (
            <span className="col-xs-2">{accounting.formatMoney(0)}</span>
            )
        }
      };


      //console.log(income);
      return (
        <div className="row" key={income.type}>
          <span className="budget-amount col-xs-2">{income.type}</span>
          <span className="budget-amount col-xs-2">{accounting.formatMoney(income.amount)}</span>
          <span className="budget-amount col-xs-2">{accounting.formatMoney(income.actual)}</span>
          {incomeSurplusDeficit()}
        </div>
      )
    });

    var expenseItems = expenseBudget.map(function(expense, index){
      function expenseSurplusDeficit(){
        if((expense.amount - expense.actual) > 0){
          return (
            <span className="surplus col-xs-2">{accounting.formatMoney(expense.amount - expense.actual)}</span>
          )
        }else if((expense.amount - expense.actual) < 0){
          return(
            <span className="deficit col-xs-2">{accounting.formatMoney(expense.amount - expense.actual)}</span>
          )
        }else{
          return(
          <span className="col-xs-2">{accounting.formatMoney(0)}</span>
          )
        }
      };
      return (
        <div className="row" key={expense.type}>
          <span className="budget-amount col-xs-2">{expense.type}</span>
          <span className="budget-amount col-xs-2">{accounting.formatMoney(expense.amount)}</span>
          <span className="budget-amount col-xs-2">{accounting.formatMoney(expense.actual)}</span>
          {expenseSurplusDeficit()}
        </div>
      )
    });

    return (
      <NavComponent>
        <div className="row">
          <div className="col-md-offset-1 col-md-10">
            <h2>Income</h2>
              <div className="row">
                <div className="col-xs-2">
                  <h4>Type</h4>
                </div>
                <div className="col-xs-2">
                  <h4>Budgeted</h4>
                </div>
                <div className="col-xs-2">
                  <h4>Actual</h4>
                </div>
                <div className="col-xs-2">
                  <h4>Surplus/(Deficit)</h4>
                </div>
              </div>
            {incomeItems}
            <br/>
            <TotalIncomeComponent budget={this.state.budget} totalBudgetIncome={this.state.totalBudgetIncome}/>
            <h2>Expense</h2>
            <div className="row">
              <div className="col-xs-2">
                <h4>Type</h4>
              </div>
              <div className="col-xs-2">
                <h4>Budgeted</h4>
              </div>
              <div className="col-xs-2">
                <h4>Actual</h4>
              </div>
              <div className="col-xs-2">
                <h4>Surplus/(Deficit)</h4>
              </div>
            </div>
            {expenseItems}
            <br/>
            <TotalExpenseComponent budget={this.state.budget} totalBudgetExpense={this.state.totalBudgetExpense}/>
          </div>
        </div>
      </NavComponent>
    )
  }
});

module.exports = {
  'BudgetReportComponent': BudgetReportComponent
};
