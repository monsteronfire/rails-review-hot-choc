Rails.application.routes.draw do
  devise_for :users
  resources :cafes
  root 'home#index'

  get 'home/profile'

  get 'auth/:provider/callback', to: 'sessions#create'
  delete 'sign_out', to: 'sessions#destroy', as: 'sign_out'

  get 'cafes/search', to: 'cafes#search'
end
