class Api::V1::UsersController < ApiController
  def show
    user = User.find(params[:id])
    render json: { user: user }
  end

  def create
    if current_user && params[:coords]
      current_user.update_attributes(geo_params)
    elsif current_user && params[:userbio]
      current_user.update_attributes(bio_params)
    elsif current_user && params[:userlocation]
      current_user.update_attributes(location_params)
    elsif current_user && params[:search_radius]
      current_user.update_attributes(radius_params)
    end
  end

  def geo_params
    params.require(:coords).permit(:latitude, :longitude)
  end

  def bio_params
    params.require(:userbio).permit(:bio)
  end

  def location_params
    params.require(:userlocation).permit(:location)
  end

  def radius_params
    params.require(:search_radius).permit(:search_radius)
  end
end
