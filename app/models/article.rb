# frozen_string_literal: true

class Article < ApplicationRecord
  include PgSearch::Model
  pg_search_scope :search_by_text, against: [:name, :text]

  belongs_to :story

  TYPES = {blog_post: 0, tweet: 1, fb_post: 2}
  TYPES_OPTIONS = TYPES.keys.map {|type| {value: type, label: type.to_s.humanize} }
  enum article_type: TYPES
end
