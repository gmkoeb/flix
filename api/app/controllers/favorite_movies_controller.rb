class FavoriteMoviesController < ApplicationController
  before_action :authenticate_user

  def index
    render status: 200, json: { favoriteMovies: Movie.format_movies(@current_user.favorite_movies.map(&:movie)) }
  end

  def create
    id = params.require(:favorite_movie).permit(:movie_id)[:movie_id]
    movie = Movie.find(id)

    @current_user.favorite_movies.create(movie:)
  end

  def destroy
    id = params.permit(:id)[:id]
    favorite_movie = @current_user.favorite_movies.find_by(movie_id: id)
    favorite_movie.delete
  end
end