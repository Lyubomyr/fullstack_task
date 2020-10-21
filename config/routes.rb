Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  api_version(module: 'API::V1', path: { value: 'api/v1' }, defaults: { format: :json }) do
    resources :articles, only: [:index, :create, :update, :destroy]
    resources :stories, only: [:index]
  end

  root to: 'static#index'
end
