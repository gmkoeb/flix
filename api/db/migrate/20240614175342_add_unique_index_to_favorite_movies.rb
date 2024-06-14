class AddUniqueIndexToFavoriteMovies < ActiveRecord::Migration[7.1]
  def change
    add_index :favorite_movies, [:user_id, :movie_id], unique: true, name: 'index_favorite_movies_on_user_id_and_movie_id'
  end
end
