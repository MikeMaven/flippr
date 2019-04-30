Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  resources :public_events, only: [:new, :create]
end
