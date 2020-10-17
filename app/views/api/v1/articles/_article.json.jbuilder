# frozen_string_literal: true

json.extract! article, :id, :name, :text
json.article_type article.article_type.humanize
json.story_name article.story.name
