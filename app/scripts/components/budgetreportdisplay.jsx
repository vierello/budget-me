var React = require('react');
var _ = require('underscore');
var accounting = require('../accounting/accounting.min.js').accounting;

var NavComponent = require('./main.jsx').NavComponent;
var BudgetReportComponent = require('./budgetreport.jsx').BudgetReportComponent;


var BudgetReportDisplayComponent = React.createClass({
  render: function(){
    return (
      <NavComponent>
        <BudgetReportComponent/>
      </NavComponent>
    )
  }
});

module.exports = {
  'BudgetReportDisplayComponent': BudgetReportDisplayComponent
};
