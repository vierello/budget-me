var React = require('react');
var accounting = require('../accounting/accounting.min.js').accounting;
console.log(accounting);

var NavComponent = require('./main.jsx').NavComponent;
var Goal = require('../models/goals').Goal;
var GoalCollection = require('../models/goals').GoalCollection;
var GoalProgressCollection = require('../models/goalprogress').GoalProgressCollection;
var router = require('../router');


var DisplayGoalComponent = React.createClass({
  getInitialState: function(){
    return {
      goals: new GoalCollection(),
      goalProgress: new GoalProgressCollection()
    }
  },

  componentWillMount: function(){
    var self = this;
    this.state.goals.fetch().done(function(){
      self.state.goalProgress.fetch().done(function(){
        self.forceUpdate();
      });
    });
  },



  render: function(){
    var self = this;
    var goals = this.state.goals;
    //console.log(goals);
    var goalList = goals.map(function(goal, index){
      var startDate = goal.get('startDate');
      var endDate = goal.get('endDate');
      var millisecondsPerDay = (1000 * 60 * 60 * 24);
      var todayUTC = new Date().getTime();
      var start = startDate.match(/(\d{4})-(\d{2})-(\d{2})/);
      var end = endDate.match(/(\d{4})-(\d{2})-(\d{2})/);
      var startDateUTC = (Date.UTC(start[1], start[2]-1, start[3]) + 14400000);
      var endDateUTC = (Date.UTC(end[1], end[2]-1, end[3]) + 14400000);
      //console.log(today);
      var daysInGoal = function(){
        //console.log(startDate);
        return ((endDateUTC - startDateUTC) / millisecondsPerDay);
      };

      var goalTimeBar = function(){
        //console.log(today);
        //console.log(startDateUTC);
        if(startDateUTC <= todayUTC){
          var daysSinceStart = (todayUTC - startDateUTC) / millisecondsPerDay;
          var totalDays = daysInGoal();
          var timeElapsed = daysSinceStart / totalDays;
          //console.log(timeElapsed * 100);
          if(timeElapsed < 100){
            var style = {
              width: timeElapsed * 100,
              minWidth: '2px'
            }
            return (
              <div className="progress goal-progress">
                <div className="progress-bar progress-bar-success" style={style}></div>
                <div className="time-goal-text">{(timeElapsed * 100).toFixed(0)}/{totalDays + ' '}days</div>
              </div>
              )
          }else{
            return (
              <div>Your goal has ended</div>
            )
          }
        }else{
          return (
            <div>This goal timer will begin in{' ' + (((startDateUTC - todayUTC) / millisecondsPerDay).toFixed(0)) + ' '}days</div>
          )
        }
      };

      var amountBar = function(){
        var goalProgressItems = self.state.goalProgress;
        var goalProgressList = goalProgressItems.where({'name': goal.get('name')}).reduce(function(memo, actual){
          return memo + actual.get('amount')
        }, 0);

        var goalAmountPortion = (goalProgressList / goal.get('amount')) * 100;
        if(goalAmountPortion < 100){
          var styles = {
            width: goalAmountPortion,
            minWidth: '2px'
          }
          return (
            <div className="progress amount-progress">
              <div className="progress-bar progress-bar-warning" style={styles}></div>
              <div className="amount-goal-text">${goalProgressList}/${goal.get('amount')}</div>
            </div>
          )
        }else{
          return (
            <div>Your goal has been reached</div>
          )
        }
      }
      return (
        <div className="well" key={index}>
          <div className="goal-display-title-bar">
            <h3 className="goal-display-title">{goal.get('name')}</h3>
            <p className="pull-right">Goal: {accounting.formatMoney(goal.get('amount'))}</p>
          </div>
          <div>{goalTimeBar()}</div>
          <div>{amountBar()}</div>
        </div>
      )
    })
    return (
      <div className="row">
        <div className="col-md-offset-1 goal-display col-md-10 col-xs-12">
          {goalList}
        </div>
      </div>
    )
  }
});
module.exports = {
  'DisplayGoalComponent': DisplayGoalComponent
};
