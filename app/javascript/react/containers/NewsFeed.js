import React from 'react';
import PublicEventTile from '../components/PublicEventTile'
import NewEventFormContainer from './NewEventFormContainer'

class NewsFeedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

componentDidMount(){
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
        this.setState({ events: body.events })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
}

  render(){
    let events = this.state.events.map((event) => {
      return(
        <PublicEventTile
          key={event.id}
          event_photo={event.event_photo.url}
          location_name={event.location_name}
        />
      )
    })
    return(
      <div className="root-container">
        <NewEventFormContainer/>
        {events}
      </div>
    )
  }
}

export default NewsFeedContainer;
