Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users, :controllers => { registrations: 'registrations' }

  resources :public_events, only: [:new, :show, :create]

  namespace :api do
    namespace :v1 do
      resources :public_events, only: [:index, :show, :create]
    end
  end
end
