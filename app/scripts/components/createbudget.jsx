var React = require('react');

var NavComponent = require('./login.jsx').NavComponent;
var NavBarComponent = require('./main.jsx').NavBarComponent;
var Budget = require('../models/budget').Budget;
var IncomeCollection = require('../models/income').IncomeCollection;
var ExpenseCollection = require('../models/expense').ExpenseCollection;


var IncomeForm = React.createClass({
  handleType: function(e){
    this.props.incomeItem.set('type', e.target.value)
  },

  handleFrequency: function(e){
    this.props.incomeItem.set('frequency', e.target.value)
  },

  handleDate: function(e){
    this.props.incomeItem.set('date', e.target.value)
  },

  handleAmount: function(e){
    this.props.incomeItem.set('amount', parseFloat(e.target.value))
  },

  render: function(){
    var income = this.props.incomeItem;
    return (
        <div className="row income-form">
          <div className="col-md-4 col-xs-12">
            <select onChange={this.handleType} className="input-field income-input form-control">
              <option>Please Choose</option>
              <option>Wages</option>
              <option>Self-Employment</option>
              <option>Alimony</option>
              <option>Child Support</option>
              <option>Other</option>
            </select>
            </div>
            <div className="col-md-3 col-xs-12">
            <select onChange={this.handleFrequency} className="input-field income-input form-control">
              <option>Please Choose</option>
              <option>Weekly</option>
              <option>Bi-Weekly</option>
              <option>Twice A Month</option>
              <option>Monthly</option>
              <option>One-Time Payment</option>
            </select>
          </div>
          <div className="col-md-2 col-xs-12"><input onChange={this.handleDate} className="input-field income-input" type="date" placeholder="Date Received?"/></div>
          <div className="col-md-2 col-xs-12"><span className="dollar-sign">$</span><input onChange={this.handleAmount} className="input-field income-input" type="number" min="0.01" step="0.01" placeholder="Amount"/></div>
          <div className="col-md-1 col-xs-12"><button onClick={this.props.handleDelete} className="btn delete-button btn-danger">X</button></div>
        </div>
    )
  }
});

var ExpenseForm = React.createClass({
  handleType: function(e){
    this.props.expenseItem.set('type', e.target.value)
  },

  handlePayee: function(e){
    this.props.expenseItem.set('payee', e.target.value)
  },

  handleDueDate: function(e){
    this.props.expenseItem.set('duedate', e.target.value)
  },

  handleAmount: function(e){
    this.props.expenseItem.set('amount', parseFloat(e.target.value))
  },

  render: function(){
    var expense = this.props.expenseItem;
    return (
        <div className="row expense-form">
          <div className="col-md-4 col-xs-12">
            <select onChange={this.handleType} className="input-field expense-input form-control">
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
          <div className="col-md-3 col-xs-12"><input onChange={this.handlePayee} className="input-field expense-input" type="text" placeholder="Payee"/></div>
          <div className="col-md-2 col-xs-12"><input onChange={this.handleDueDate} className="input-field expense-input" type="date" placeholder="Date Due"/></div>
          <div className="col-md-2 col-xs-12"><span className="dollar-sign">$</span><input onChange={this.handleAmount} className="input-field expense-input" type="number" min="0.01" step="0.01" placeholder="Amount"/></div>
          <div className="col-md-1 col-xs-12"><button onClick={this.props.handleDelete} className="btn delete-button btn-danger">X</button></div>
        </div>
    )
  }
});


var CreateBudgetComponent = React.createClass({
  getInitialState: function(){
    var income = new IncomeCollection();
    income.add([{}]);
    var expense = new ExpenseCollection();
    expense.add([{}]);

    return {
      income: income,
      expense: expense,
      budget: new Budget()
    }
  },

  componentWillMount: function(){
    var self = this;
    var budget = this.state.budget;

    budget.on('change', this.update);
    this.state.income.on('add', this.update);
    this.state.expense.on('add', this.update)

    if(this.props.objectId){
      budget.set('obejectId', this.props.objectId);
      budget.fetch().done(function(){
        self.setState({
          income: budget.get('income'),
          expense: budget.get('expense'),
          budget: budget,
        });
      });
    }
  },

  update: function(){
    this.forceUpdate();
  },

  handleSubmit: function(e){
    e.preventDefault();
    var router = this.props.router;
    var budget = this.state.budget;
    var income = this.state.income;
    var expense = this.state.expense;
    var user = JSON.parse(localStorage.getItem('user'));

    budget.set('income', income.toJSON());
    budget.set('expense', expense.toJSON());
    budget.setPointer('user', user, '_User')
    budget.save().done(function(){
      router.navigate('budgetreport/', {trigger: true});
    });
  },

  addIncomeItem: function(e){
    e.preventDefault();
    this.state.income.add({});
  },

  addExpenseItem: function(e){
    e.preventDefault();
    this.state.expense.add({});
  },

  handleDelete: function(e){
    e.preventDefault();
  },

  render: function(){
    var self = this;
    var incomeFormSet = this.state.income.map(function(incomeItem, index){
      return <IncomeForm key={incomeItem.cid} handleDelete={self.handleDelete} incomeItem={incomeItem}/>
    });

    var expenseFormSet = this.state.expense.map(function(expenseItem, index){
      return <ExpenseForm key={expenseItem.cid} handleDelete={self.handleDelete} expenseItem={expenseItem}/>
    });

    return (
      <NavComponent>
        <NavBarComponent/>
        <div className="row">
          <div className="col-md-offset-1 well col-md-10 col-xs-offset-1 col-xs-10 create-budget-container">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="income-section col-xs-12">
                  <h3 className="income-header well">Income</h3>
                  <button onClick={this.addIncomeItem} className="pull-right btn btn-success">Add Item</button>
                    <div className="form-group">
                      <div className="row table-headings">
                        <span className="col-md-4 col-xs-12 input-header">Type? <hr/></span>
                        <span className="col-md-3 col-xs-12 input-header">How Often? <hr/></span>
                        <span className="col-md-2 col-xs-12 input-header">Received? <hr/></span>
                        <span className="col-md-2 col-xs-12 input-header">Amount? <hr/></span>
                        <span className="col-md-1 col-xs-12 input-header">Delete <hr/></span>
                      </div>
                      {incomeFormSet}
                    </div>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="expense-section col-xs-12">
                  <h3 className="expense-header well">Expenses</h3>
                  <button onClick={this.addExpenseItem} className="pull-right btn btn-success">Add Item</button>
                  <div className="form-group">
                    <div className="row table-headings">
                      <span className="col-md-4 col-xs-12 input-header">Type? <hr/></span>
                      <span className="col-md-3 col-xs-12 input-header">Payee? <hr/></span>
                      <span className="col-md-2 col-xs-12 input-header">Date Due? <hr/></span>
                      <span className="col-md-2 col-xs-12 input-header">Amount? <hr/></span>
                      <span className="col-md-1 col-xs-12 input-header">Delete <hr/></span>
                    </div>
                    {expenseFormSet}
                  </div>
                  <input type="submit" className="btn btn-success" value="Save Budget"/>
                </div>
              </div>
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
