import React from 'react';
import SearchResultTile from './SearchResultTile'

class LocationSearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      locations: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.getInfo = this.getInfo.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange = () => {
    this.setState({ query: this.search.value })
    let query = this.state.query
    if (query.length > 3) {
      this.getInfo()
    }
  }

  getInfo = () => {
    fetch(`http://pinballmap.com/api/v1/locations/?by_location_name=${this.state.query}`, {
      mode: "cors"
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
          this.setState({ locations: body.locations })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleClick(event, allParams){
    this.props.sendUpLocationInfo(allParams)
  }

  render(){
    let resultsState
    let results = this.state.locations.map((location) => {
      return(
        <SearchResultTile
          key={location.id}
          name={location.name}
          city={location.city}
          state={location.state}
          allParams={location}
          handleClick={this.handleClick}
        />
      )
    })
    if (this.state.locations.length >= 1) {
      resultsState = "active"
    } else {
      resultsState = "hidden"
    }
    return(
      <div className="react-location-search">
        <form>
          <input
            placeholder="Search Public Locations Here"
            ref={input => this.search = input}
            onChange={this.handleChange}
            value={this.state.query}
          />
        </form>
        <div className={`location-search-results-${resultsState}`}>
         {results}
        </div>
      </div>
    )
  }
}

export default LocationSearchField;
