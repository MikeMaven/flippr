class Api::V1::PublicEventsController < ApiController
  def index
    render json: { events: serialized_public_events, radius: current_user.search_radius, current_user: current_user }
  end

  def show
    if UserEventRsvp.where(user: current_user, public_event: PublicEvent.find(params[:id])).length >= 1
    rsvp = UserEventRsvp.where(user: current_user, public_event: PublicEvent.find(params[:id]))[0]
    render json: { event: serialized_public_event, current_user: current_user.id, user_rsvp: rsvp.attending }
    else
      render json: { event: serialized_public_event, current_user: current_user.id, user_rsvp: false }
    end
  end

  def create
    if current_user
      @public_event = PublicEvent.new(title: params[:title], description: params[:description], location_name: params[:location_name], location_id: params[:location_id], location_address: params[:location_address], location_city: params[:location_city], location_state: params[:location_state], location_zip: params[:location_zip], start_time: params[:start_time], end_time: params[:end_time], event_photo: params[:event_photo], user_id: current_user.id)

      @public_event.save
    else
      redirect_to new_user_session_path
    end
  end

  def update
    if params[:id]
      event =PublicEvent.find(params[:id])
      event.update_attributes(event_params)
      render json: { event: serialized_public_event, success_message: "Event updated!" }
    end
  end

  def destroy
    PublicEvent.find(params[:id]).delete
  end

  def serialized_public_events
    if current_user.latitude != nil
      ActiveModel::Serializer::ArraySerializer.new(PublicEvent.near([current_user.latitude, current_user.longitude], current_user.search_radius).sort_by {|event| [event.distance_to("#{current_user.location}"), event.start_time] }, each_serializer: PublicEventSerializer)
    else
      ActiveModel::Serializer::ArraySerializer.new(PublicEvent.near("#{current_user.location}", current_user.search_radius).sort_by {|event| [event.distance_to("#{current_user.location}"), event.start_time] }, each_serializer: PublicEventSerializer)
    end
  end

  def serialized_public_event
    ActiveModel::SerializableResource.new(PublicEvent.find(params[:id]), serializer: PublicEventSerializer)
  end

  def event_params
    params.require(:event).permit(:start_time, :end_time, :description)
  end
end
