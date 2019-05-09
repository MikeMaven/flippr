import React from 'react';

import Dropzone from 'react-dropzone';
import TextField from '../components/TextField';
import LocationSearchField from '../components/LocationSearchField';
import DateTimeField from '../components/DateTimeField';

class NewEventFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      file: [],
      errors: {},
      selectedLocation: {},
      infoIsHidden: true,
      searchIsHidden: false,
      starttime: '',
      endtime: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendUpLocationInfo = this.sendUpLocationInfo.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.handlePublicSubmit = this.handlePublicSubmit.bind(this)
  }

  onDrop(file) {
  if(file.length == 1) {
    this.setState({ file: file })
  } else {
    let uploadError = { uploadError: "Please only upload one file per event."}
    this.setState({ errors: Object.assign({}, this.state.errors, uploadError) })
  }
}

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  sendUpLocationInfo(params) {
    this.setState({ selectedLocation: params, infoIsHidden: false, searchIsHidden: true })
  }

  handlePublicSubmit(event){
    event.preventDefault();

    let body = new FormData()
    body.append("title", this.state.title)
    body.append("description", this.state.description)
    body.append("location_name", this.state.selectedLocation.name)
    body.append("location_id", this.state.selectedLocation.id)
    body.append("location_address", this.state.selectedLocation.street)
    body.append("location_city", this.state.selectedLocation.city)
    body.append("location_state", this.state.selectedLocation.state)
    body.append("location_zip", this.state.selectedLocation.zip)
    body.append("start_time", this.state.startTime)
    body.append("end_time", this.state.endTime)
    body.append("event_photo", this.state.file[0])

    fetch("/api/v1/public_events.json",{
      credentials: 'same-origin',
      method: 'POST',
      body: body
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
        .then(response => response.json())
        .then(body => {
          this.setState({
            title: '',
            description: '',
            file: [],
            errors: {},
            selectedLocation: {},
            infoIsHidden: true,
            searchIsHidden: false
          })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    console.log(this.state)
    return(
      <form className="react-new-event-form" onSubmit={this.handleSubmit}>
        <TextField
          name="title"
          label="Event Name: (60 characters max)"
          value={this.state.title}
          handleChangeMethod={this.handleChange}
        />

          { !this.state.searchIsHidden && <LocationSearchField
            sendUpLocationInfo={this.sendUpLocationInfo}
          /> }

        { !this.state.infoIsHidden &&
          (
          <div>
          <div className="public-event-form-info-photo">
            <div className="selected-location-info">
              <p>
                {this.state.selectedLocation.name}<br/>
                {this.state.selectedLocation.street}<br/>
                {this.state.selectedLocation.city}, {this.state.selectedLocation.state} {this.state.selectedLocation.zip}<br/>
                Number of games: {this.state.selectedLocation.num_machines}
              </p>
            </div>
            <div className="public-event-file-uploader">
              <p>Add and Event Photo:</p>
              <Dropzone onDrop={this.onDrop}>
                <div className="photo-icon">
                  <i className="fas fa-camera-retro"></i>
                </div>
              </Dropzone>
            </div>
          </div>
          <div className="date-and-time-pickers">
            <DateTimeField
              label="Event Start Time:"
              name="starttime"
              content={this.state.starttime}
              handleChangeMethod={this.handleChange}
            />
            <DateTimeField
              label="Event End Time:"
              name="endtime"
              content={this.state.endtime}
              handleChangeMethod={this.handleChange}
            />
          </div>
          <div className="public-event-description-field">
            <label htmlFor="description">Event Description:</label>
            <textarea onChange={this.handleChange} name="description" value={this.state.description} rows="5"/>
          </div>
          <input onClick={this.handlePublicSubmit} className="button" type="submit" value="Let's Flip!" />
          </div>
        )}
      </form>
    )
  }
}

export default NewEventFormContainer;
