import React from 'react';

class RsvpButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_rsvp: this.props.userRsvp
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.toggleRsvp()
    this.props.handleClick()
  }

  toggleRsvp(){
    if (this.state.user_rsvp) {
      this.setState({ user_rsvp: false })
    } else {
      this.setState({ user_rsvp: true })
    }
  }

  render(){
    let buttonType
    if (!this.state.user_rsvp) {
      buttonType = "success"
    } else {
      buttonType = "alert"
    }
    let buttonText
    if (!this.state.user_rsvp) {
      buttonText = "I'm flippin!"
    } else {
      buttonText = "I'll flip another time."
    }
    return(
      <button onClick={this.handleClick} className={`button small ${buttonType}`} id="rsvp-button">
      {buttonText}
      </button>
    )
  }
}

export default RsvpButton;
