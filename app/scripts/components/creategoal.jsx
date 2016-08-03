var React = require('react');

var NavComponent = require('./main.jsx').NavComponent;
var Goal = require('../models/goals').Goal;
var GoalCollection = require('../models/goals').GoalCollection;
var DisplayGoalComponent = require('./displaygoal.jsx').DisplayGoalComponent;


var CreateGoalComponent = React.createClass({
  getInitialState: function(){
    return {
      goal: new Goal()
    }
  },

  handleGoalName: function(e){
    this.state.goal.set('name', e.target.value);
  },

  handleGoalAmount: function(e){
    this.state.goal.set('amount', parseFloat(e.target.value));
  },

  handleGoalStartDate: function(e){
    this.state.goal.set('startDate', e.target.value);
  },

  handleGoalEndDate: function(e){
    this.state.goal.set('endDate', e.target.value);
  },

  handleSubmit: function(e){
    e.preventDefault();
    var self = this;
    var user = JSON.parse(localStorage.getItem('user'));
    console.log(this.state.goal);
    this.state.goal.setPointer('user', user, '_User')
    this.state.goal.save().done(function(){
      self.props.router.navigate('main/', {trigger: true});
    });
  },

  render: function(){
    return (
      <NavComponent>
        <div className="row">
          <div className="well col-md-offset-1 col-md-5 col-xs-12">
            <h2 className="well goal-title">Create a New Goal</h2>
            <form onSubmit={this.handleSubmit} className="goal-form form-group">
              <div className="form-group create-goal-group">
                <label htmlFor="goal-name" className="control-label">Goal Name: </label>
                <input onChange={this.handleGoalName} id="goal-name" type="text" className="goal-input control-input" placeholder="Name Your Goal"/>
              </div>
              <div className="form-group create-goal-group">
                <label htmlFor="goal-amount" className="control-label">Goal Amount: </label>
                <input onChange={this.handleGoalAmount} id="goal-amount" type="number" className="goal-input control-input" min="0.01" step="0.01" placeholder="Set Goal Amount"/>
              </div>
              <div className="form-group create-goal-group">
                <label htmlFor="goal-start-date" className="control-label">Goal Start Date: </label>
                <input onChange={this.handleGoalStartDate} id="goal-start-date" type="date" className="goal-input control-input"/>
              </div>
              <div className="form-group create-goal-group">
                <label htmlFor="goal-end-date" className="control-label">Goal End Date: </label>
                <input onChange={this.handleGoalEndDate} id="goal-end-date" type="date" className="goal-input control-input"/>
              </div>
                <button type="submit" className="btn btn-success">Create Goal</button>
            </form>
          </div>
        </div>
        <DisplayGoalComponent/>
      </NavComponent>
    )
  }
});

module.exports = {
  'CreateGoalComponent': CreateGoalComponent
}
