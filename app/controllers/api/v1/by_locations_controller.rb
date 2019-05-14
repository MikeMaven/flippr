class Api::V1::ByLocationsController < ApiController
  def show
    render json: { events: serialized_public_events, radius: current_user.search_radius, current_user: current_user, near: " near #{params[:id]}" }
  end

  def serialized_public_events
      ActiveModel::Serializer::ArraySerializer.new(PublicEvent.near("#{params[:id]}", current_user.search_radius).sort_by {|event| [event.distance_to("#{params[:id]}"), event.start_time] }, each_serializer: PublicEventSerializer)
  end
end
