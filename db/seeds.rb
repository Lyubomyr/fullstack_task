# Create Stories
10.times { Story.create!(name: Faker::Lorem.word) }

# Create Articles
160.times {
  story = Story.all.sample
  Article.create!(
    story: story,
    name: Faker::Lorem.word,
    article_type: Article::TYPES.values.sample,
    text: Faker::Lorem.sentence
  )
}
