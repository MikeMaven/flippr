import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import PublicEventTile from '../components/PublicEventTile';
import NewEventFormContainer from './NewEventFormContainer';

class NewsFeedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      radius: 100,
      toggleForm: true,
      current_user: {}
    }
    this.toggleForm = this.toggleForm.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.getEvents = this.getEvents.bind(this)
  }

  toggleForm(){
    if (this.state.toggleForm) {
      this.setState({ toggleForm: false })
    } else {
      this.setState({ toggleForm: true })
    }
  }

  getEvents(){
    fetch('/api/v1/public_events.json')
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
          this.setState({ events: body.events, radius: body.radius, current_user: body.current_user, toggleForm: true })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleRefresh(){
    this.getEvents()
  }

  componentDidMount(){
    navigator.permissions &&
    navigator.permissions.query({name: 'geolocation'}).then(function(PermissionStatus) {
        if('granted' === PermissionStatus.state) {
            navigator.geolocation.getCurrentPosition(function(position) {
              let body = {coords: {latitude: position.coords.latitude, longitude: position.coords.longitude}}
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
            });
        } else {
          (window.location.href = '/location');
        }
    })
    this.getEvents()
  }

  render(){
    let events = this.state.events.map((event) => {
      if (event.is_future) {
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
      }
    })
    let noEvents
    if (events.length === 0) {
      noEvents = (<h5>Looks like there are no events in your area yet! Why not add one?</h5>)
    }
    return(
      <div className="root-container">
        <input className="add-event-button" type="button" value="Add A Flip Sesh" onClick={this.toggleForm}/>
        {!this.state.toggleForm && <NewEventFormContainer handleRefresh={this.handleRefresh}/>}
        <h6>Showing all events within {this.state.radius} miles:</h6>
        {events}
        {noEvents}
      </div>
    )
  }
}

export default NewsFeedContainer;
