import React from 'react';
import { Link } from 'react-router';

import TextField from '../components/TextField'

class UserDashBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: "",
        last_name: "",
        username: "",
        profile_photo: {
          thumb: {
            url: ""
          },
          profile: {
            url: ""
          }
        }
      },
      hideRadiusEdit: true,
      hideLocationEdit: true,
      eventRadius: "",
      userLocation: "",
      submissionSuccess: ""
    }
    this.submitRadius = this.submitRadius.bind(this)
    this.submitLocation = this.submitLocation.bind(this)
    this.toggleRadiusMenu = this.toggleRadiusMenu.bind(this)
    this.toggleLocationMenu = this.toggleLocationMenu.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitBio = this.submitBio.bind(this)
    this.bioChange = this.bioChange.bind(this)
    this.successMessage = this.successMessage.bind(this)
    this.resetSuccess = this.resetSuccess.bind(this)
  }

  successMessage(){
    setTimeout(this.resetSuccess, 3000)
    this.setState({ submissionSuccess: "Bio successfully updated!" })
  }

  resetSuccess(){
    this.setState({ submissionSuccess: "" })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  bioChange(event) {
    let user = this.state.user
    user.bio = event.target.value
    this.setState({ user })
  }

  submitRadius(event){
    event.preventDefault();

    let body = { search_radius: { search_radius: this.state.eventRadius } }
    fetch("/api/v1/users",{
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}(${response.statusText})` ,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    this.toggleRadiusMenu()
  }

  submitBio(event){
    event.preventDefault();

    let body = { userbio: { bio: this.state.user.bio } }
    fetch("/api/v1/users",{
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}(${response.statusText})` ,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    this.successMessage();
  }

  submitLocation(event){
    event.preventDefault();

    let body = { userlocation: { location: this.state.userLocation } }
    fetch("/api/v1/users",{
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}(${response.statusText})` ,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));

    this.toggleLocationMenu()
  }

  toggleRadiusMenu(){
    if (this.state.hideRadiusEdit) {
      this.setState({ hideRadiusEdit: false })
    } else {
      this.setState({ hideRadiusEdit: true })
    }
  }

  toggleLocationMenu(){
    if (this.state.hideLocationEdit) {
      this.setState({ hideLocationEdit: false })
    } else {
      this.setState({ hideLocationEdit: true })
    }
  }

  componentDidMount(){
    fetch(`/api/v1/users/${this.props.params.id}.json`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
        })
        .then(response => response.json())
        .then(body => {
          this.setState({ user: body.user })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let user = this.state.user
    return(
      <div className="user-dashboard-page">
        <div className="user-dashboard-user">
          <div className="user-dashboard-photo">
            <img src={user.profile_photo.profile.url}/>
            <h5>{user.first_name} {user.last_name}</h5>
            <h6>@{user.username}</h6>
          </div>
          <div className="user-dashboard-right">
            <div className="user-dashboard-host">
              <div className="user-dash-header">
                User Dashboard
              </div>
            </div>
            <div className="user-dashboard-info">
              <h4>View All My Events</h4>
              <span>View events you have created or RSVP'd to.</span>
              <Link to={`/users/${this.state.user.id}/public_events`}>
              <span className="button tiny warning dashboard-button">My Events</span>
              </Link>
              <h4>Update Event Radius</h4>
              <span onClick={this.toggleRadiusMenu} className="button tiny warning dashboard-button">Open Menu</span>
            <div className="user-dashboard-address">
              <span>Browser not compatible with geolocation?</span>
              <span>Set your location manually here:</span>
            </div>
            <h4>Set Location</h4>
            <span onClick={this.toggleLocationMenu} className="button tiny warning dashboard-button">Open Menu</span>
          </div>
          </div>
          <div className="user-dashboard-description">
            <p className="bio-update-success">{this.state.submissionSuccess}</p>
            <strong>Bio:</strong><br/>
            <form>
            <textarea name="bio" value={this.state.user.bio} onChange={this.bioChange} rows="10" cols="40"/>
            <input onClick={this.submitBio} className="button success tiny" type="submit" value="Update Bio" />
            </form>
          </div>
        </div>
        { !this.state.hideRadiusEdit && (
          <div className="user-dashboard-menu">
            <form onSubmit={this.submitRadius}>
            <TextField
              name="eventRadius"
              label="Edit Search Radius of Event Feed"
              value={this.state.eventRadius}
              handleChangeMethod={this.handleChange}
            /> Miles
            </form>
          </div>
        )}

        { !this.state.hideLocationEdit && (
          <div className="user-dashboard-menu">
            <form onSubmit={this.submitLocation}>
            <TextField
              name="userLocation"
              label="Enter an address or landmark:"
              value={this.state.userLocation}
              handleChangeMethod={this.handleChange}
            />
            </form>
          </div>
        )}
      </div>
    )
  }
}

export default UserDashBoardContainer;
