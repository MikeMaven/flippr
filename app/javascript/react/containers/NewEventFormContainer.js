import React from 'react';

import moment from 'moment';
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
      selectedLocation: {},
      infoIsHidden: true,
      searchIsHidden: false,
      starttime: '',
      endtime: '',
      messages: {},
      loading: true,
      hideSpinner: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendUpLocationInfo = this.sendUpLocationInfo.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.handlePublicSubmit = this.handlePublicSubmit.bind(this)
    this.validateInput = this.validateInput.bind(this)
    this.validatePhoto = this.validatePhoto.bind(this)
  }

  onDrop(file) {
  if(file.length === 1) {
    this.setState({ file: file })
  } else {
    let uploadError = { uploadError: "Please only upload one file per event, and make sure it is a jpg, jpeg, or png."}
    this.setState({ messages: Object.assign({}, this.state.messages, uploadError) })
  }
}

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  sendUpLocationInfo(params) {
    this.setState({ selectedLocation: params, infoIsHidden: false, searchIsHidden: true })
  }

  validatePhoto(){
    if (this.state.file.length !== 1 && (this.state.file[0]["name"].includes(".jpg") || this.state.file[0]["name"].includes(".png") || this.state.file[0]["name"].includes(".jpeg")))
    {
      let newError = { nameError: 'You must upload an event photo.' }
      this.setState({ messages: Object.assign({}, this.state.messages, newError) })
      return false
    } else {
      return true
    }
  }

  validateInput(selection){
    if (selection.trim() === '') {
      if (selection === this.state.title) {
        let newError = { nameError: 'Your event must have a title.' }
        this.setState({ messages: Object.assign({}, this.state.messages, newError) })
      }
      else if (selection === this.state.selectedLocation.street) {
        let newError = { nameError: 'Your event must choose a location.' }
        this.setState({ messages: Object.assign({}, this.state.messages, newError) })
      }
      else if (selection === this.state.starttime) {
        let newError = { nameError: 'You must enter a start time.' }
        this.setState({ messages: Object.assign({}, this.state.messages, newError) })
      }
      else if (selection === this.state.endtime) {
        let newError = { nameError: 'You must enter an end time.' }
        this.setState({ messages: Object.assign({}, this.state.messages, newError) })
      }
      else if (selection === this.state.description) {
        let newError = { nameError: 'You must enter a description for your event.' }
        this.setState({ messages: Object.assign({}, this.state.messages, newError) })
      }
      else {
        let newError = { nameError: 'There has been an error with your form.' }
        this.setState({ messages: Object.assign({}, this.state.messages, newError) })
      }
      return false
    } else {
      let messagestate = this.state.messages
      delete messagestate.values
      this.setState({ messages: {} })
      return true
    }
  }

  handlePublicSubmit(event){
    this.setState({ hideSpinner: false })
    event.preventDefault();

    if (
      this.validateInput(this.state.title) &&
      this.validateInput(this.state.description) &&
      this.validateInput(this.state.selectedLocation.street) &&
      this.validateInput(this.state.starttime) &&
      this.validateInput(this.state.endtime) &&
      this.validatePhoto()
    ){
    let body = new FormData()
    body.append("title", this.state.title)
    body.append("description", this.state.description)
    body.append("location_name", this.state.selectedLocation.name)
    body.append("location_id", this.state.selectedLocation.id)
    body.append("location_address", this.state.selectedLocation.street)
    body.append("location_city", this.state.selectedLocation.city)
    body.append("location_state", this.state.selectedLocation.state)
    body.append("location_zip", this.state.selectedLocation.zip)
    body.append("start_time", moment(`${this.state.starttime}`).format())
    body.append("end_time", moment(`${this.state.endtime}`).format())
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
      .then(response => {
        this.props.handleRefresh()
      })
      .catch(error => {
        let formError = { formError: error.message }
        this.setState({ messages: Object.assign({}, this.state.messages, formError) })
        console.error(`Error in fetch: ${error.message}`)
      });
    }
  }

  render(){
    let messageDiv
    let messageItems

    if (Object.keys(this.state.messages).length > 0) {
      messageItems = Object.values(this.state.messages).map(message => {
        return(<li key={message}>{message}</li>)
      })
      messageDiv = (<div className="callout alert">{messageItems}</div>)
    }
    return(
      <div className="new-event-form-div">
        <form className="react-new-event-form">
        {messageDiv}
        <TextField
          name="title"
          label="Event Name: (60 characters max)"
          value={this.state.title}
          handleChangeMethod={this.handleChange}
        />
          {!this.state.searchIsHidden && <div className="location-search-header">Enter the name of a pinball location you  plan to play at soon.</div>}
          {!this.state.searchIsHidden && <div className="location-search-example">Flip Sessions take place in public pinball locations so anyone in the pinball community can join.</div>}
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
              <p>Add an Event Photo:</p>
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
          <div className="form-submit-div">
            <input onClick={this.handlePublicSubmit} className="button" id="form-submit-button" type="submit" value="Let's Flip!" />
            {!this.state.hideSpinner && <div className="spinner"></div>}
          </div>
          </div>
        )}
      </form>
    </div>
    )
  }
}

export default NewEventFormContainer;
