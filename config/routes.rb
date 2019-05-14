Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users, :controllers => { registrations: 'registrations' }

  resources :public_events, only: [:new, :show, :create, :edit]
  resources :users, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :public_events, only: [:index, :show, :create, :destroy, :update]
      resources :users, only: [:show, :create]
      resources :by_locations, only: [:show]
    end
  end

  get "/location", to: "user_locations#index"
  get "/dashboard/:id", to: "dashboards#show"
  get "/api/v1/by_locations/:location", to: "api/v1/by_locations#show"
end
