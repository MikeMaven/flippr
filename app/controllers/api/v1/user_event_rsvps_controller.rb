class Api::V1::UserEventRsvpsController < ApiController
  def index
    event = PublicEvent.find(params[:public_event_id])
    user_event_rsvp = UserEventRsvp.where(user: current_user, public_event: event)[0]
    if user_event_rsvp
      render json: { user_rsvp: user_event_rsvp }
    else
      render json: { user_rsvp: { attending: false } }
    end
  end

  def create
    if current_user
      if UserEventRsvp.where(user: current_user, public_event: PublicEvent.find(params[:public_event_id])).length >= 1
        user_event_rsvp = UserEventRsvp.where(user: current_user, public_event: PublicEvent.find(params[:public_event_id]))[0]
        if user_event_rsvp.attending
          user_event_rsvp.update(attending: false)
        else
          user_event_rsvp.update(attending: true)
        end
      else
        user_event_rsvp = UserEventRsvp.new(user: current_user, public_event: PublicEvent.find(params[:public_event_id]), attending: true)
        user_event_rsvp.save
      end
    end
      render json: { event: serialized_public_event, user_rsvp: user_event_rsvp.attending }
  end

  def rsvp_params
    params.require(:status).permit(:attending)
  end

  def serialized_public_event
    ActiveModel::SerializableResource.new(PublicEvent.find(params[:public_event_id]), serializer: PublicEventSerializer)
  end
end
