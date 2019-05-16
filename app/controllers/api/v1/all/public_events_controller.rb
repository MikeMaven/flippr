class Api::V1::All::PublicEventsController < ApiController
  def index
    render json: { user_events: serialized_user_events, rsvpd_events: serialized_rsvpd_events, current_user: current_user }
  end

  def serialized_user_events
    ActiveModel::Serializer::ArraySerializer.new(PublicEvent.where(user_id: params[:user_id]), each_serializer: PublicEventSerializer)
  end

  def serialized_rsvpd_events
    user = User.find(params[:user_id])
    all_rsvps = user.user_event_rsvps
    rsvps = all_rsvps.where(attending: true)
    event_ids = rsvps.pluck(:public_event_id)
    ActiveModel::Serializer::ArraySerializer.new(PublicEvent.where(id: event_ids), each_serializer: PublicEventSerializer)
  end
end
