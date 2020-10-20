# frozen_string_literal: true

json.extract! article, :id, :name, :text, :article_type
json.story {|json| json.partial! "api/v1/stories/story", story: article.story }
