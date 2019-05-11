class Api::V1::PublicEventsController < ApiController
  def index
    render json: { events: serialized_public_events, radius: current_user.search_radius }
  end

  def show
    render json: PublicEvent.find(params[:id])
  end

  def create
    if current_user
      @public_event = PublicEvent.new(title: params[:title], description: params[:description], location_name: params[:location_name], location_id: params[:location_id], location_address: params[:location_address], location_city: params[:location_city], location_state: params[:location_state], location_zip: params[:location_zip], start_time: params[:start_time], end_time: params[:end_time], event_photo: params[:event_photo], user_id: current_user.id)
      if @public_event.save
        render json: {event: @public_event}
      else
        render json: { messages: @public_event.errors.full_messages }, status: :unprocessable_entity
      end
    else

    end
  end

  def serialized_public_events
    if current_user.latitude != nil
      ActiveModel::Serializer::ArraySerializer.new(PublicEvent.near([current_user.latitude, current_user.longitude], current_user.search_radius).sort_by {|event| [event.distance_to("#{current_user.location}"), event.start_time] }, each_serializer: PublicEventSerializer)
    else
      ActiveModel::Serializer::ArraySerializer.new(PublicEvent.near("#{current_user.location}", current_user.search_radius).sort_by {|event| [event.distance_to("#{current_user.location}"), event.start_time] }, each_serializer: PublicEventSerializer)
    end
  end
end
