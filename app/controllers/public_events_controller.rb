class PublicEventsController < ApplicationController
  before_action :configure_permitted_parameters, if: :devise_controller?

  def index  
  end

  def show
  end

  def new
    @public_event = PublicEvent.new
  end

  def edit
  end

  def create
    @public_event = PublicEvent.new(public_event_params)
    @public_event.user_id = current_user.id
    if @public_event.save
      flash[:notice] = "Event successfully added!"
      redirect_to "/"
    else
      flash[:errors] = @public_event.errors.full_messages.join(", ")
      render action: 'new'
    end
  end

  def public_event_params
    params.require(:public_event).permit(:user_id, :location_name, :location_address, :location_city, :location_state, :location_zip, :date, :start_time,:end_time, :description, :event_photo)
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:submit, keys: [:event_photo])
  end
end
