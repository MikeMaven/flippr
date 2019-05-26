Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users, :controllers => { registrations: 'registrations' }

  resources :public_events, only: [:new, :show, :create, :edit]
  resources :users, only: [:show] do
      resources :public_events, only: [:index]
  end

  namespace :api do
    namespace :v1 do
      resources :public_events, only: [:index, :show, :create, :destroy, :update] do
        resources :user_event_rsvps, only: [:index, :create]
        resources :user_event_comments, only: [:create, :destroy]
      end
      resources :users, only: [:show, :create] do
        namespace :all do
          resources :public_events, only: [:index]
        end
      end
      resources :by_locations, only: [:show]
    end
  end

  get "/splash", to: "splash#index"
  get "/location", to: "user_locations#index"
  get "/dashboard/:id", to: "dashboards#show"
  get "/api/v1/by_locations/:location", to: "api/v1/by_locations#show"
  get "/.well-known/acme-challenge/:content", to: "challenge#letsencrypt"
end
