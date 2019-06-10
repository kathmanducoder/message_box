Rails.application.routes.draw do
  resources :users
  resources :messages
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'
end
