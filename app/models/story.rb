# frozen_string_literal: true

class Story < ApplicationRecord
  has_many :articles, dependent: :destroy
end
