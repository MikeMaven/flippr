Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users, :controllers => { registrations: 'registrations' }

  resources :public_events, only: [:new, :show, :create]
  resources :users, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :public_events, only: [:index, :show, :create]
      resources :users, only: [:show, :create]
    end
  end

  get "/location", to: "user_locations#index"
  get "/dashboard/:id", to: "dashboards#show"
end
