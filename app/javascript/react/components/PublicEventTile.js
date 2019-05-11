import React from 'react'
import { Link } from 'react-router';

import moment from 'moment';

const PublicEventTile = props => {
  return(
    <div className="event-tile">
      <div className="event-tile-content">
        <div className="event-tile-user-info">
          <Link to={`/users/${props.user.id}`}>
          <img src={props.user.profile_photo.thumb.url}/>
          </Link>
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
            <span className="event-tile-sub-info">
              <p className="event-tile-location">{props.locationName}</p>
              <p className="event-tile-date">{moment(props.date).format('MMMM Do YYYY')}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicEventTile;
