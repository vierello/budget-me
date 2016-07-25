var React = require('react');

var NavComponent = require('./login.jsx').NavComponent;
var NavBarComponent = require('./main.jsx').NavBarComponent;

var CreateGoalComponent = React.createClass({
  render: function(){
    return (
      <NavComponent>
        <NavBarComponent/>
        <div className="row">
          <div className="well col-xs-offset-1 col-xs-10">
            <h2 className="well goal-title">Create a New Goal</h2>
            <form className="form-group">
              <input type="text" className="goal-name" placeholder="Name Your Goal"/>
              <input type="number" className="goal-amount" placeholder="Set Goal Amount"/>
              <input type="date" className="goal-date" placeholder="Target Date"/>
            </form>
          </div>
        </div>
      </NavComponent>
    )
  }
});

module.exports = {
  'CreateGoalComponent': CreateGoalComponent
}
