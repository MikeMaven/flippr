import React from 'react';

class UserProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: "",
        last_name: "",
        username: "",
        profile_photo: {
          thumb: {
            url: ""
          },
          profile: {
            url: ""
          }
        },
      }
    }
  }

  componentDidMount(){
    fetch(`/api/v1/users/${this.props.params.id}.json`)
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
    let user = this.state.user
    return(
      <div className="user-show-page">
        <div className="user-show-user">
          <div className="user-show-photo">
            <img src={user.profile_photo.profile.url}/>
            <h5>{user.first_name} {user.last_name}</h5>
            <h6>@{user.username}</h6>
          </div>
          <div className="user-show-right">
            <div className="user-show-host">
              <div className="user-dash-header">
                {user.first_name} {user.last_name}'s Profile
              </div>
            </div>
            <div className="user-show-info">
              <h4>Other stuff.</h4>
              <h5>Will go here.</h5>
            <div className="user-show-address">
              <span>And even more</span>
              <span>really good stuff.</span>
            </div>
          </div>
          </div>
          <div className="user-show-description">
            <strong>Bio:</strong><br/>
            <p>The user bio will go here.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfileContainer;
