class FavoriteMoviesController < ApplicationController
  before_action :authenticate_user

  def index
    render status: 200, json: { favoriteMovies: format_movies(@current_user.favorite_movies) }
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
  private 

  def format_movies(favorite_movies)
    favorite_movies.map do |favorite_movie|
      {
        id: favorite_movie.movie.id,
        title: favorite_movie.movie.title,
        description: favorite_movie.movie.description,
        release_date: favorite_movie.movie.release_date,
        duration: favorite_movie.movie.duration,
        actors: Genre.format_actors(favorite_movie.movie),
        movie_genres: Genre.format_genres(favorite_movie.movie)
      }
    end
  end
end