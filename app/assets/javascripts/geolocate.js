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
      .then(response => response.json())
      .then(body => {

      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
});
