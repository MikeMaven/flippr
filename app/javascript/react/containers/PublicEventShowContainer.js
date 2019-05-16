import React from 'react';

import moment from 'moment';
import GoogleMapContainer from './GoogleMapContainer'
import RsvpButton from '../components/RsvpButton'
import AttendeeTile from '../components/AttendeeTile'
import EventDiscussionTile from '../components/EventDiscussionTile'

class PublicEventShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBox: '',
      currentUser: '',
      comments: [],
      user_rsvp: false,
      mounted: false,
      event: {
        attendees: [],
        title: 'Loading...',
        description: 'Loading...',
        location_name: '',
        location_address: '',
        start_time: '',
        end_time: '',
        event_photo: {
          show: { url: ''}
        },
        created_by: {
          first_name: '',
          last_name: '',
          profile_photo: {thumb:
            {url: ''}
          }
        }
      }
    }
    this.handleRsvp = this.handleRsvp.bind(this)
    this.getEventInfo = this.getEventInfo.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleComment = this.handleComment.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  handleChange(event){
    this.setState({ commentBox: event.target.value })
  }

  getEventInfo(){
    let event_id  = this.props.params.id
    fetch(`/api/v1/public_events/${event_id}.json`)
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
          this.setState({
            event: body.event.public_event,
            user_rsvp: body.user_rsvp,
            mounted: true,
            comments: body.comments,
            currentUser: body.current_user
          })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleRsvp(){
    event.preventDefault();
    let currentEvent = this.state.event;

    fetch(`/api/v1/public_events/${currentEvent.id}/user_event_rsvps`,{
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(),
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
          this.setState({
            event: body.event.public_event,
            user_rsvp: body.user_rsvp,
            mouted: false
          })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleComment(){
    event.preventDefault();
    let currentEvent = this.state.event;

    let body = { comment: { body: this.state.commentBox } }

    fetch(`/api/v1/public_events/${currentEvent.id}/user_event_comments`,{
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
          this.setState({ comments: body.comments, commentBox: '' })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleRefresh(){
    this.getEventInfo()
  }

  componentDidMount(){
    this.getEventInfo()
  }

  render(){
    let rsvpButton = (this.state.mounted && <RsvpButton
      eventId={this.state.event.id}
      handleClick={this.handleRsvp}
      userRsvp={this.state.user_rsvp}
    />)

    let attendees = this.state.event.attendees.slice(0, 5).map((user) => {
      return(
        <AttendeeTile
          key={user.user_id}
          userId={user.user_id}
        />
      )
    })

    let totalAttendees = (this.state.event.attendees.length - 5)
    let overflowDiv
    if (totalAttendees > 0) {
      overflowDiv = (
        <div className="attendees-overflow">
        <span>+{totalAttendees}</span>
        <span>Others</span>
        </div>
      )
    }

    let eventComments = this.state.comments.map((comment) => {
      return (
        <EventDiscussionTile
        eventId={this.state.event.id}
        id={comment.id}
        key={comment.id}
        user={comment.created_by}
        currentUser={this.state.currentUser}
        body={comment.body}
        handleRefresh={this.handleRefresh}
        />
      )
    })

    let event = this.state.event

    return(
      <div className="event-show-page">
        <div className="event-show-event">
          <div className="event-show-photo">
            <img src={event.event_photo.show.url}/>
            {rsvpButton}
          </div>
          <div className="event-show-right">
            <div className="event-show-host">
              <p>Hosted by:</p>
              <div className="event-show-host-tag">
                <img src={event.created_by.profile_photo.thumb.url}/>
                {event.created_by.first_name} {event.created_by.last_name}
              </div>
            </div>
            <div className="event-show-info">
              <h4>{event.title}</h4>
              <h5>{event.location_name}</h5>
            <div className="event-show-address">
              <span>{event.location_address}</span>
              <span>{event.location_city}, {event.location_state} {event.location_zip}</span>
            </div>
            <h6>Start Time: {moment(event.start_time).format('MMMM Do YYYY, h:mm a')}</h6>
            <h6>End Time: {moment(event.end_time).format('MMMM Do YYYY, h:mm a')}</h6>
          </div>
          </div>
          <div className="event-show-description">
            <strong>Description:</strong><br/>
            <p>{event.description}</p>
          </div>
        </div>
        <div className="event-show-comment">
          <div className="rsvp-and-comment">
            <div className="rsvp-container">
              <span className="rsvp-header">
              Flippin' with:
              </span>
              <div className="event-show-attendees">
                {attendees}{overflowDiv}
              </div>
            </div>
            <div className="event-comment-box">
              <textarea onChange={this.handleChange} value={this.state.commentBox} name="commentBody" rows="10" cols="50"/>
              <button onClick={this.handleComment} className="button small" id="comment-box-button">
              Join the Discussion
              </button>
            </div>
            <div className="attendee-photos">
            </div>
          </div>
          <div className="google-map">
          { this.state.mounted &&
            <GoogleMapContainer
              lat={parseFloat(event.latitude)}
              long={parseFloat(event.longitude)}
              zoom={16}
            />
          }
          </div>
        </div>
        <div className="event-discussion-header">
        <h3>DISCUSSION:</h3>
        </div>
        {eventComments}
      </div>
    )
  }
}

export default PublicEventShowContainer;
