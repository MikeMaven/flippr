import React from 'react'
import { Link } from 'react-router';

const PublicEventTile = props => {
  return(
    <div className="event-tile">
      <div className="event-tile-content">
        <div className="event-tile-user-info">
          <img src={props.user.profile_photo.thumb.url}/>
          <h5 className="event-tile-user-name">{props.user.first_name} {props.user.last_name}</h5>
        </div>
        <div className="event-tile-event">
          <div className="event-tile-photo">
            <Link to={`/public_events/${props.id}`}>
              <img src={props.event_photo}/>
            </Link>
          </div>
          <div className="event-tile-info">
            <Link to={`/public_events/${props.id}`}>
              <h4 className="event-tile-title">{props.title}</h4>
            </Link>
            <p className="event-tile-location">{props.locationName}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicEventTile;
