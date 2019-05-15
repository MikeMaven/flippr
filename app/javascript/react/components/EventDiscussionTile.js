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

    fetch(`/api/v1/public_events/${this.props.eventId}/user_event_comments/${this.props.id}`,{
      method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(
        this.props.handleRefresh()
      )
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    return(
      <div className="event-tile">
        <div className="event-tile-content">
          <div className="event-menu">
            {this.props.user.id === this.props.currentUser && (
              <button onClick={this.toggleOptionMenu} className="button tiny" id="event-options">...</button>
            )}
            {!this.state.toggleOptionMenu && (
              <div className="event-option-dropdown">
              <span onClick={this.handleDelete}>Delete Comment</span>
              </div>
            )}
          </div>
          <div className="event-tile-user-info">
            <Link to={`/users/${this.props.user.id}`}>
            <img src={this.props.user.profile_photo.thumb.url}/>
            </Link>
            <h5 className="event-tile-user-name">{this.props.user.first_name} {this.props.user.last_name}</h5>
          </div>
          <div className="event-comment-body">
          {this.props.body}
          </div>
        </div>
      </div>
    )
  }
}

export default PublicEventTile;
