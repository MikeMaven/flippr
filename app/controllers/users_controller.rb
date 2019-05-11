class UsersController < ApplicationController
  before_action :authorize_user
  def show
    if current_user.id == params[:id].to_i
      redirect_to "/dashboard/#{current_user.id}"
    else
      @user = User.find(params[:id])
    end
  end

  def authorize_user
    if !user_signed_in?
      redirect_to new_user_session_path
    end
  end
end
