import React from 'react'
import { Link } from 'react-router';

import moment from 'moment';

class PublicEventTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleOptionMenu: true
    }
    this.toggleOptionMenu = this.toggleOptionMenu.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  toggleOptionMenu(event){
    event.preventDefault();

    if (this.state.toggleOptionMenu) {
      this.setState({ toggleOptionMenu: false })
    } else {
      this.setState({ toggleOptionMenu: true })
    }
  }

  handleDelete(event){
    event.preventDefault();

    fetch(`/api/v1/public_events/${this.props.id}`,{
      method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => {
        this.setState({ toggleOptionMenu: true });
        this.props.handleRefresh()
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    return(
      <div className="event-tile">
        <div className="event-tile-content">
          <div className="event-menu">
            {this.props.user.id === this.props.current_user_id && (
              <button onClick={this.toggleOptionMenu} className="button tiny" id="event-options">...</button>
            )}
            {!this.state.toggleOptionMenu && (
              <div className="event-option-dropdown">
              <span><Link to={`/public_events/${this.props.id}/edit`}>Edit Event</Link></span>
              <span onClick={this.handleDelete} className="noselect">Delete Event</span>
              </div>
            )}
          </div>
          <div className="event-tile-user-info">
            <Link to={`/users/${this.props.user.id}`}>
            <img className="event-tile-user-photo" src={this.props.user.profile_photo.thumb.url}/>
            </Link>
            <h5 className="event-tile-user-name">{this.props.user.first_name} {this.props.user.last_name}</h5>
          </div>
          <div className="event-tile-event">
            <div className="event-tile-photo">
              <Link to={`/public_events/${this.props.id}`}>
                <img className="event-tile-event-photo" src={this.props.event_photo}/>
              </Link>
            </div>
            <div className="event-tile-info">
              <Link to={`/public_events/${this.props.id}`}>
                <h4 className="event-tile-title">{this.props.title}</h4>
              </Link>
              <span className="event-tile-sub-info">
                <p className="event-tile-location">{this.props.locationName}</p>
                <p className="event-tile-date">{moment(this.props.date).format('MMMM Do YYYY')}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PublicEventTile;
