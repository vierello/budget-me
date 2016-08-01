var React = require('react');

var NavComponent = require('./main.jsx').NavComponent;
var User = require('../models/users').User;


var ProfileForm = React.createClass({
  handleFirstName: function(e){
    this.props.user.set('firstName', e.target.value)
  },

  handleLastName: function(e){
    this.props.user.set('lastName', e.target.value)
  },

  handleAddress: function(e){
    this.props.user.set('address', e.target.value)
  },

  handleCityState: function(e){
    this.props.user.set('cityState', e.target.value)
  },

  handleZip: function(e){
    this.props.user.set('zip', e.target.value)
  },

  handlePicture: function(e){
    this.props.user.set('picture', e.target.value)
  },

  handleSubmit: function(e){
    e.preventDefault();
    this.props.user.save();
  },

  render: function(){
    console.log(this.props.user);
    return (
    <form onSubmit={this.handleSubmit} className="profile-form">
      <h2>Profile Information</h2>
      <div className="row">
        <div className="col-xs-12 col-md-6 form-group">
          <div className="profile-input-group col-xs-12 form-group">
            <label htmlFor="profile-first-name" className="control-label">First Name: </label>
            <input onChange={this.handleFirstName} className="profile-input control-input" id="profile-first-name" type="text" placeholder="First Name"/>
          </div>
          <div className="profile-input-group col-xs-12 form-group">
            <label htmlFor="profile-last-name" className="control-label">Last Name: </label>
            <input onChange={this.handleLastName} className="profile-input control-input" id="profile-last-name" type="text" placeholder="Last Name"/>
          </div>
          <div className="profile-input-group col-xs-12 form-group">
            <label htmlFor="profile-address" className="control-label">Address: </label>
            <input onChange={this.handleAddress} className="profile-input control-input" id="profile-address" type="text" placeholder="Street Address"/>
          </div>
          <div className="profile-input-group col-xs-12 form-group">
            <label htmlFor="profile-city" className="control-label">City, State: </label>
            <input onChange={this.handleCityState} className="profile-input control-input" id="profile-city" type="text" placeholder="City, State"/>
          </div>
          <div className="profile-input-group col-xs-12 form-group">
            <label htmlFor="profile-zip" className="control-label">Zip Code: </label>
            <input onChange={this.handleZip} className="profile-input control-input" id="profile-zip" type="text" placeholder="Zip Code"/>
          </div>
        </div>
        <div className="col-xs-12 col-md-6 form-group">
          <label className="profile-picture-label" className="control-label" htmlFor="profile-picture">Picture: </label>
          <input onChange={this.handlePicture} className="profile-picture-input control-input" id="profile-picture" type="url" placeholder="Image"/>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <p className="save-profile-button"><button type="submit" className="save-button btn btn-success">Save Profile Info</button></p>
          </div>
        </div>
      </div>
    </form>
    )
  }
})

var ProfileComponent = React.createClass({
  getInitialState: function(){
    return {
      user: new User(JSON.parse(localStorage.getItem('user')))
    }
  },

  render: function(){
    return(
      <NavComponent>
        <div className="row">
          <div className="col-xs-12 col-md-offset-3 col-md-6 well">
            <ProfileForm user={this.state.user}/>
          </div>
        </div>
      </NavComponent>
    )
  }
});

module.exports = {
  'ProfileComponent': ProfileComponent
};
