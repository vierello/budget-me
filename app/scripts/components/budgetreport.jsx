var React = require('react');
var _ = require('underscore');

var NavComponent = require('./main.jsx').NavComponent;
var Budget = require('../models/budget').Budget;
var BudgetCollection = require('../models/budget').BudgetCollection;
var IncomeCollection = require('../models/income').IncomeCollection;
var ActualCollection = require('../models/actual').ActualCollection;
var Actual = require('../models/actual').Actual;


// var BudgetIncomeComponent = React.createClass({
//   render: function(){
//     var budget = this.props.budget;
//     var budgetList = budget.get('income').map(function(incomeItem, index){
//         return (
//           <div key={index} className="row">
//             <span className="col-sm-3">{incomeItem.type}</span>
//             <span className="col-sm-3">${(incomeItem.amount).toFixed(2)}</span>
//           </div>
//         )
//     });
//
//     return (
//       <div>
//         <div className="row">
//           <h4 className="col-sm-3">Type</h4>
//           <h4 className="col-sm-3">Budget</h4>
//         </div>
//         {budgetList}
//       </div>
//     )
//   }
// });

//var BudgetExpenseComponent = React.createClass({
  // componentWillMount: function(){
  //   var self = this;
  //   //var actualExpense = this.props.actualCollection;
  //   var mortgageRentCollection = new ActualCollection();
  //   var healthInsuranceCollection = new ActualCollection();
  //   var carPaymentCollection = new ActualCollection();
  //   var creditCardCollection = new ActualCollection();
  //   var gasCollection = new ActualCollection();
  //   var electricCollection = new ActualCollection();
  //   var cellPhoneCollection = new ActualCollection();
  //   var cableCollection = new ActualCollection();
  //   var studentLoanCollection = new ActualCollection();
  //   var carInsuranceCollection = new ActualCollection();
  //   var groceriesCollection = new ActualCollection();
  //   var waterCollection = new ActualCollection();
  //   var garbageCollection = new ActualCollection();
  //   var subscriptionCollection = new ActualCollection();
  //   var fuelCollection = new ActualCollection();
  //   var otherCollection = new ActualCollection();
  //
  //   //console.log(actualExpenseCollection);
  //   mortgageRentCollection.where({
  //     "type": "Mortgage/Rent"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({mortgageRent: mortgageRentCollection});
  //     //console.log(self.state.mortgageRent);
  //   });
  //   healthInsuranceCollection.where({
  //     "type": "Health Insurance"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({healthInsurance: healthInsuranceCollection});
  //     //console.log(self.state.healthInsurance);
  //   });
  //   carPaymentCollection.where({
  //     "type": "Car Payment"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({carPayment: carPaymentCollection});
  //     //console.log(self.state.carPayment);
  //   });
  //   creditCardCollection.where({
  //     "type": "Credit Card"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({creditCard: creditCardCollection});
  //     //console.log(self.state.creditCard);
  //   });
  //   gasCollection.where({
  //     "type": "Gas"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({gas: gasCollection});
  //     //console.log(self.state.gas);
  //   });
  //   electricCollection.where({
  //     "type": "Electric"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({electric: electricCollection});
  //     //console.log(self.state.electric);
  //   });
  //   cellPhoneCollection.where({
  //     "type": "Cell Phone"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({cellPhone: cellPhoneCollection});
  //     //console.log(self.state.cellPhone);
  //   });
  //   cableCollection.where({
  //     "type": "Cable"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({cable: cableCollection});
  //     //console.log(self.state.cable);
  //   });
  //   studentLoanCollection.where({
  //     "type": "Student Loan"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({studentLoan: studentLoanCollection});
  //     //console.log(self.state.studentLoan);
  //   });
  //   carInsuranceCollection.where({
  //     "type": "Car Insurance"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({carInsurance: carInsuranceCollection});
  //     //console.log(self.state.carInsurance);
  //   });
  //   groceriesCollection.where({
  //     "type": "Groceries"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({groceries: groceriesCollection});
  //     //console.log(self.state.groceries);
  //   });
  //   waterCollection.where({
  //     "type": "Water"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({water: waterCollection});
  //     //console.log(self.state.water);
  //   });
  //   garbageCollection.where({
  //     "type": "Garbage"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({garbage: garbageCollection});
  //     //console.log(self.state.garbage);
  //   });
  //   subscriptionCollection.where({
  //     "type": "Subscription"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({subscription: subscriptionCollection});
  //     //console.log(self.state.subscription);
  //   });
  //   fuelCollection.where({
  //     "type": "Fuel"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({fuel: fuelCollection});
  //     //console.log(self.state.fuel);
  //   });
  //   otherCollection.where({
  //     "type": "Other"
  //   }).fetch().done(function(){
  //     //console.log(actualExpenseCollection);
  //     self.setState({other: otherCollection});
  //     //console.log(self.state.other);
  //   });
  // },
//
//   render: function(){
//     var self = this;
//     //console.log(this.props);
//     var budget = this.props.budget;
//     var budgetList = budget.get('expense').map(function(expenseItem, index){
//         return (
//           <div key={index} className="row">
//             <span className="col-sm-3">{expenseItem.type}</span>
//             <span className="col-sm-3">${(expenseItem.amount).toFixed(2)}</span>
//           </div>
//         )
//     });
//
//     console.log(budget);
//     return (
//       <div>
//         <div className="row">
//           <h4 className="col-sm-3">Type</h4>
//           <h4 className="col-sm-3">Budget</h4>
//         </div>
//         {budgetList}
//       </div>
//     )
//   }
// });

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

// var NetIncomeComponent = React.createClass({
//   render: function(){
//     return (
//       <TotalIncomeComponent/>
//     )
//   }
// });

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
      //  console.warn(budgetCollection[0]);

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
    console.log(expenseBudget);
    this.calcActuals(incomeBudget);
    this.calcActuals(expenseBudget);
    console.log(expenseBudget);



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
