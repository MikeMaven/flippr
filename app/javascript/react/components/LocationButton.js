import React from 'react';

class LocationButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.getLocation = this.getLocation.bind(this)
  }

  getLocation(){
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
      .then(response => {
        (window.location.href = "/")
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    });
  }

  render(){
    return(
      <div>
      <h6 className="button button-large" onClick={this.getLocation}>Get My Location</h6>
      </div>
    )
  }
}

export default LocationButton;
