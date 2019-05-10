class Api::V1::UsersController < ApiController
  def create
    if current_user
      current_user.update_attributes(geo_params)
    end
  end

  def geo_params
    params.require(:coords).permit(:latitude, :longitude)
  end
end
