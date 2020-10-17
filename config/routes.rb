Rails.application.routes.draw do
  api_version(module: 'API::V1', path: { value: 'api/v1' }, defaults: { format: :json }) do
    resources :articles, only: [:index, :create, :update, :destroy]
  end

  root to: 'static#index'
end
