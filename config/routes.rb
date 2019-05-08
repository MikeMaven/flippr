Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  resources :public_events, only: [:new, :create]

  namespace :api do
    namespace :v1 do
      resources :public_events, only: [:index, :create]
    end
  end
end
