class PublicEventsController < ApplicationController
  before_action :configure_permitted_parameters, if: :devise_controller?

  def new
    @public_event = PublicEvent.new
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:submit, keys: [:event_photo])
  end
end
