import React from 'react';

import GoogleMapReact from 'google-map-react';
import MapMarker from '../components/MapMarker'

const GoogleMapContainer = props => {
  return(
    <div style={{ height: "350px", width: '500px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCW276AtgggRkTsdMoltjPq3-drY0qjAO4" }}
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
