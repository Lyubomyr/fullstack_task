# frozen_string_literal: true

class API::V1::StoriesController < API::V1::BaseController
  def index
    @stories = Story.order(:name)
  end
end
