# frozen_string_literal: true

json.extract! article, :id, :name, :text, :article_type
json.story do
  json.id nil
  json.name article.story_count
end
