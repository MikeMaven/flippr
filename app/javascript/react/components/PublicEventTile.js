import React from 'react'

const PublicEventTile = props => {
  return(
    <div>
      <img src={props.event_photo}/>
      <h4>{props.location_name}</h4>
    </div>
  )
}

export default PublicEventTile;
