# frozen_string_literal: true

json.stories do |json|
  json.array!(@stories) do |story|
    json.partial! "api/v1/stories/story", story: story
  end
end
