import React from 'react';

import TextField from '../components/TextField';
import LocationSearchField from '../components/LocationSearchField';

class NewEventFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      errors: {},
      selectedLocation: {},
      infoIsHidden: true,
      searchIsHidden: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendUpLocationInfo = this.sendUpLocationInfo.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  sendUpLocationInfo(params) {
    this.setState({ selectedLocation: params, infoIsHidden: false, searchIsHidden: true })
  }

  render(){
    let infoDivStatus
    if (this.state.selectedLocation.keys !== undefined) {
      infoDivStatus = "-visible"
    } else {
      infoDivStatus = "-collapsed"
    }
    let searchFieldStatus
    if (this.state.selectedLocation.keys !== undefined) {
      searchFieldStatus = "-collapsed"
    } else {
      searchFieldStatus = "-visible"
    }
    return(
      <div className="react-new-event-form">
        <input type="radio" id="public" name="location-type" value="public" />
        <label htmlFor="public">Public Location</label>
        <input type="radio" id="private" name="location-type" value="private"/>
        <label htmlFor="private">Private Location</label>
        <TextField
          name="title"
          label="Event Name:"
          value={this.state.title}
          handleChangeMethod={this.handleChange}
        />

          { !this.state.searchIsHidden && <LocationSearchField
            sendUpLocationInfo={this.sendUpLocationInfo}
          />}

        { !this.state.infoIsHidden &&
          (<div className="selected-location">
          <p>
            {this.state.selectedLocation.name}<br/>
            {this.state.selectedLocation.street}<br/>
            {this.state.selectedLocation.city}, {this.state.selectedLocation.state} {this.state.selectedLocation.zip}<br/>
            Number of games: {this.state.selectedLocation.num_machines}
          </p>
        </div>) }
      </div>
    )
  }
}

export default NewEventFormContainer;
