Rails.application.routes.draw do
  resources :users
  get 'users/:id/inbox', to: 'users#inbox', as: :inbox
  get 'users/:id/sent_messages', to: 'users#sent_messages', as: :sent_messages
  resources :messages
  get '/messages/:id/content', to: 'messages#content'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'
end
