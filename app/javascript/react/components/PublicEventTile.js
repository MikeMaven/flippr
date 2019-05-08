import React from 'react'

const PublicEventTile = props => {
  return(
    <div className="event-tile">
      <div className="event-tile-content">
        <img src={props.event_photo}/>
        <div className="event-tile-info">
          <h4>{props.title}</h4>
          <p>{props.description}</p>
          <p><strong>{props.location_name}</strong></p>
        </div>
      </div>
    </div>
  )
}

export default PublicEventTile;
