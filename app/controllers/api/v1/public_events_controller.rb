class Api::V1::PublicEventsController < ApiController
  def index
    events = PublicEvent.all
    render json: { events: serialized_public_events }
  end

  def create
    @public_event = PublicEvent.new(title: params[:title], description: params[:description], location_name: params[:location_name], location_id: params[:location_id], location_address: params[:location_address], location_city: params[:location_city], location_state: params[:location_state], location_zip: params[:location_zip], start_time: params[:start_time], end_time: params[:end_time], event_photo: params[:event_photo], user_id: current_user.id)
    if @public_event.save
      events = PublicEvent.all
      render json: {events: events}
    else
      flash[:errors] = @public_event.errors.full_messages.join(", ")
    end
  end

  def serialized_public_events
    ActiveModel::Serializer::ArraySerializer.new(PublicEvent.all, each_serializer: PublicEventSerializer)
  end
end
