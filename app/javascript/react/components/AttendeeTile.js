import React from 'react';
import { Link } from 'react-router';

class AttendeeTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: '',
        profile_photo: {
          thumb: {
            url: ''
          }
        }
      }
    }
  }

  componentDidMount(){
    fetch(`/api/v1/users/${this.props.userId}`)
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
          this.setState({ user: body.user })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    return(
      <div className="attendee-tile-photo">
      <Link to={`/users/${this.state.user.id}`}>
        <img src={this.state.user.profile_photo.thumb.url}/>
      </Link>
      </div>
    )
  }
}

export default AttendeeTile;
