Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup',
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  resources :genres, only: %w[index]
  resources :favorite_movies, only: %w[index create]
  get 'check_session', to: 'check_session#check'
end
