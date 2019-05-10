import React from 'react';

import moment from 'moment';

class PublicEventShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <div className="event-show-page">
        <div className="event-show-event">
          <div className="event-show-photo">
            <img src={event.event_photo.show.url}/>
          </div>
          <div className="event-show-right">
            <div className="event-show-host">
              <p>Hosted by:</p>
              <div className="event-show-host-tag">
                <img src={event.created_by.profile_photo.thumb.url}/>
                {event.created_by.first_name} {event.created_by.last_name}
              </div>
            </div>
            <div className="event-show-info">
              <h4>{event.title}</h4>
              <h5>{event.location_name}</h5>
            <div className="event-show-address">
              <span>{event.location_address}</span>
              <span>{event.location_city}, {event.location_state} {event.location_zip}</span>
            </div>
            <h6>Start Time: {moment(event.start_time).format('MMMM Do YYYY, h:mm a')}</h6>
            <h6>End Time: {moment(event.end_time).format('MMMM Do YYYY, h:mm a')}</h6>
          </div>
          </div>
          <div className="event-show-description">
            <strong>Description:</strong><br/>
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default PublicEventShowContainer;
