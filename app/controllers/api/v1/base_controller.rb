# frozen_string_literal: true

class API::V1::BaseController < ApplicationController
  include ActionController::RequestForgeryProtection
  protect_from_forgery with: :exception
  # protect_from_forgery unless: -> { request.format.json? }
end
