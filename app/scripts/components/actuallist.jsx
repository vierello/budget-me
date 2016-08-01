var React = require('react');

var ActualCollection = require('../models/actual').ActualCollection;
var NavComponent = require('./main.jsx').NavComponent;


var ActualListComponent = React.createClass({
  getInitialState: function(){
    return {
      actualCollection: []
    }
  },

  componentWillMount: function(){
    var self = this;
    var actualCollection = new ActualCollection();

    actualCollection.fetch().done(function(){
      //console.log(actualCollection);
      self.setState({actualCollection: actualCollection});
    });
    //console.log(this.state.actual);
  },

  render: function(){
    var self = this;
    var actualCollection = this.state.actualCollection;
    //console.log(actualCollection);
    var actual = actualCollection.map(function(actualItem, index){
      //console.log(actualItem.get('type'));
      return (
        <tr key={index} className="actual-list">
          <td>{actualItem.get('createdAt').slice(0, 10)}</td>
          <td>{actualItem.get('type')}</td>
          <td>{actualItem.get('description')}</td>
          <td>${actualItem.get('amount').toFixed(2)}</td>
        </tr>
      )
    });

    return (
      <NavComponent>
        <div className="row">
          <table className="col-xs-12 col-md-offset-2 col-md-8">
            <thead className="row">
              <tr>
                <th>Transaction Date</th>
                <th>Transaction Type</th>
                <th>Transaction Description</th>
                <th>Transaction Amount</th>
              </tr>
            </thead>
            <tbody className="row">
              {actual}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-offset-2 col-md-8">
            <p className="return-home-button"><a href="#main/"><button className="btn btn-warning">Return Home</button></a></p>
          </div>
        </div>
      </NavComponent>
    )
  }
});

module.exports = {
  'ActualListComponent': ActualListComponent
};
