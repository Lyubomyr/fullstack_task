# frozen_string_literal: true

json.types Article::TYPES_OPTIONS
json.total_pages @articles.total_pages
json.total_count @articles.total_count

json.articles do |json|
  json.array!(@articles) do |article|
    if @grouped_by
      partial = @grouped_by == 'story' ? "api/v1/articles/article_story_grouped" : "api/v1/articles/article_grouped"
      json.partial! partial, article: article
    else
      json.partial! "api/v1/articles/article", article: article
    end
  end
end
