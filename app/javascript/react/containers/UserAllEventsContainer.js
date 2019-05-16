import React from 'react';

import PublicEventTile from '../components/PublicEventTile'

class UserAllEventsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_events: [],
      rsvpd_events: [],
      toggleUserEvents: false,
      toggleRsvps: true,
      current_user: {}
    }
    this.handleToggleEvents = this.handleToggleEvents.bind(this)
    this.handleToggleRsvp = this.handleToggleRsvp.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  handleToggleEvents(){
    if (this.state.toggleUserEvents) {
      this.setState({ toggleUserEvents: false, toggleRsvps: true})
    }
  }

  handleToggleRsvp(){
    if (this.state.toggleRsvps) {
      this.setState({ toggleUserEvents: true, toggleRsvps: false})
    }
  }

  handleRefresh(){
    this.getEvents()
  }

  getEvents(){
    fetch(`/api/v1/users/${this.props.routeParams.user_id}/all/public_events.json`)
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
          this.setState({user_events: body.user_events, rsvpd_events: body.rsvpd_events, current_user: body.current_user })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount(){
    this.getEvents()
  }

  render(){
    let userEvents = this.state.user_events.map((event) => {
      return(
        <PublicEventTile
        id={event.id}
        key={event.id}
        event_photo={event.event_photo.url}
        title={event.title}
        locationName={event.location_name}
        user={event.created_by}
        date={event.start_time}
        current_user_id={this.state.current_user.id}
        handleRefresh={this.handleRefresh}
        />
      )
    })

    let userRsvps = this.state.rsvpd_events.map(event => {
      return(
        <PublicEventTile
        id={event.id}
        key={event.id}
        event_photo={event.event_photo.url}
        title={event.title}
        locationName={event.location_name}
        user={event.created_by}
        date={event.start_time}
        current_user_id={this.state.current_user.id}
        handleRefresh={this.handleRefresh}
        />
      )
    })

    let userEventsHeader = (<span className="all-events-header">Events You Have Created:</span>)
    let userRsvpHeader = (<span className="all-events-header">Events You Are Flippin' at:</span>)
    return(
      <div className="all-events-container">
        <div className="all-events-toggle-buttons">
          <button onClick={this.handleToggleEvents} className="button tiny" id={`user-events-${this.state.toggleUserEvents}`}>All Events</button>
          <button onClick={this.handleToggleRsvp} className="button tiny" id={`user-events-${this.state.toggleRsvps}`}>All RSVPs</button>
        </div>
        <div className="all-events-events">
          {!this.state.toggleUserEvents && userEventsHeader}
          {!this.state.toggleUserEvents && userEvents}
          {!this.state.toggleRsvps && userRsvpHeader}
          {!this.state.toggleRsvps && userRsvps}
        </div>
      </div>
    )
  }
}

export default UserAllEventsContainer;
