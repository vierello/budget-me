var React = require('react');

var NavComponent = require('./login.jsx').NavComponent;

var NavBarComponent = React.createClass({
  render: function(){
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
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
            </ul>
          </div>
        </div>
      </nav>
    )
  }
});

var MainComponent = React.createClass({
  render: function(){
    return (
      <NavComponent>
        <NavBarComponent/>
        <div>
          Welcome {localStorage.getItem('username')}
        </div>
      </NavComponent>
    )
  }

});

module.exports = {
  'MainComponent': MainComponent,
  'NavBarComponent': NavBarComponent
}
