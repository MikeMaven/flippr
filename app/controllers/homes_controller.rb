class HomesController < ApplicationController
  before_action :authorize_user
  def index
    current_user.public_events.each do |event|
      if !event.is_future
        event.destroy
      end
    end
  end

  def authorize_user
    if !user_signed_in?
      redirect_to splash_path
    end
  end
end
