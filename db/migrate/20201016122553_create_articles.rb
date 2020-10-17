class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      t.references :story, null: false, foreign_key: true
      t.integer :article_type, null: false, default: 0
      t.string :name, null: false
      t.text :text

      t.timestamps
    end
  end
end
