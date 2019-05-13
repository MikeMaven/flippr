import React from 'react';
import DateTimeField from '../components/DateTimeField'

import moment from 'moment';

class PublicEventEditContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: '',
      event: {
        title: 'Loading...',
        description: 'Loading...',
        location_name: '',
        location_address: '',
        start_time: '',
        end_time: '',
        event_photo: {
          show: { url: ''}
        },
        created_by: {
          first_name: '',
          last_name: '',
          profile_photo: {thumb:
            {url: ''}
          }
        }
      }
    }
    this.descriptionChange = this.descriptionChange.bind(this)
    this.startChange = this.startChange.bind(this)
    this.endChange = this.endChange.bind(this)
    this.submitEventEdit = this.submitEventEdit.bind(this)
  }

  descriptionChange(e) {
    let eventEditing = this.state.event
    eventEditing.description = e.target.value
    this.setState({ event: eventEditing })
  }

  startChange(e) {
    let eventEditing = this.state.event
    eventEditing.start_time = e.target.value
    this.setState({ event: eventEditing })
  }

  endChange(e) {
    let eventEditing = this.state.event
    eventEditing.end_time = e.target.value
    this.setState({ event: eventEditing })
  }

  submitEventEdit(e){
    e.preventDefault()

    let editedEvent = ({
      description: this.state.event.description,
      start_time: this.state.event.start_time,
      end_time: this.state.event.start_time
    })
    fetch(`/api/v1/public_events/${this.state.event.id}`,{
      credentials: 'same-origin',
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event: editedEvent })
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
          this.setState({ event: body.event.public_event, successMessage: body.success_message })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount(){
    let event_id  = this.props.params.id
    fetch(`/api/v1/public_events/${event_id}.json`)
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
          this.setState({ event: body.public_event })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let event = this.state.event
    return(
      <div className="event-edit-page">
        <div className="event-edit-event">
          <div className="event-edit-photo">
            <img src={event.event_photo.show.url}/>
          </div>
          <div className="event-edit-right">
            <div className="event-edit-host">
              <p>Hosted by:</p>
              <div className="event-edit-host-tag">
                <img src={event.created_by.profile_photo.thumb.url}/>
                {event.created_by.first_name} {event.created_by.last_name}
              </div>
            </div>
            <div className="event-edit-info">
              <h4>{event.title}</h4>
              <h5>{event.location_name}</h5>
            <div className="event-edit-address">
              <span>{event.location_address}</span>
              <span>{event.location_city}, {event.location_state} {event.location_zip}</span>
            </div>
            <h6>Start Time: {moment(event.start_time).format('MMMM Do YYYY, h:mm a')}</h6>
            <h6>End Time: {moment(event.end_time).format('MMMM Do YYYY, h:mm a')}</h6>
          </div>
          </div>
          <div className="event-edit-description">
            <form onSubmit={this.submitEventEdit}>
              <DateTimeField
                label="Event Start Time:"
                name="starttime"
                content={this.state.event.start_time}
                handleChangeMethod={this.startChange}
              />
              <DateTimeField
                label="Event End Time:"
                name="endtime"
                content={this.state.event.end_time}
                handleChangeMethod={this.endChange}
              />
              <strong>Description:</strong><br/>
              <textarea name="description" value={this.state.event.description} onChange={this.descriptionChange} rows="10"/>
              <input className="button success tiny" type="submit" value="Update Event" />
              <p className="event-edit-success">{this.state.successMessage}</p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default PublicEventEditContainer;
