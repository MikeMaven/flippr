class Api::V1::PublicEventsController < ApiController
  def index
    events = PublicEvent.all
    render json: { events: events }
  end
end
