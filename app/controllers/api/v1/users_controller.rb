class Api::V1::UsersController < ApiController
  def show
    user = User.find(params[:id])
    render json: { user: user }
  end

  def create
    if current_user
      current_user.update_attributes(geo_params)
    end
  end

  def geo_params
    params.require(:coords).permit(:latitude, :longitude)
  end
end
