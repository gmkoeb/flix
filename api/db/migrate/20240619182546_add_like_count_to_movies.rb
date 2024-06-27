class AddLikeCountToMovies < ActiveRecord::Migration[7.1]
  def change
    add_column :movies, :like_count, :integer, :default => 0
  end
end
