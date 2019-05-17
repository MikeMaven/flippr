import React from 'react';

import GoogleMapReact from 'google-map-react';
import MapMarker from '../components/MapMarker'

const GoogleMapContainer = props => {
  return(
    <div style={{ height: "350px", width: '500px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCdfh1qfZLC5xIYOu5_s1ZsIubdBHolOWA" }}
        defaultCenter={{lat: props.lat, lng: props.long}}
        defaultZoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
      <MapMarker
        lat={props.lat}
        lng={props.long}
      />
      </GoogleMapReact>
    </div>
  )
}

export default GoogleMapContainer;
