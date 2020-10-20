# frozen_string_literal: true

json.total_pages @articles.total_pages
json.total_count @articles.total_count
json.types Article::TYPES_OPTIONS
json.articles do |json|
  json.array!(@articles) do |article|
    json.partial! "api/v1/articles/article", article: article
  end
end
