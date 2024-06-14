class CreateMovies < ActiveRecord::Migration[7.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.datetime :release_date
      t.text :description
      t.integer :duration

      t.timestamps
    end
  end
end
