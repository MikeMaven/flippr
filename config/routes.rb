Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users, :controllers => { registrations: 'registrations', omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :public_events, only: [:new, :show, :create, :edit]
  resources :users, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :public_events, only: [:index, :show, :create, :destroy, :update] do
        resources :user_event_rsvps, only: [:index, :create]
        resources :user_event_comments, only: [:create, :destroy]
      end
      resources :users, only: [:show, :create]
      resources :by_locations, only: [:show]
    end
  end

  get "/location", to: "user_locations#index"
  get "/dashboard/:id", to: "dashboards#show"
  get "/api/v1/by_locations/:location", to: "api/v1/by_locations#show"
end
