class LikedMoviesController < ApplicationController
  before_action :authenticate_user

  def index
    render status: 200, json: { likedMovies: LikedMovie.all.map(&:movie) }
  end

  def create
    id = params.require(:liked_movie).permit(:movie_id)[:movie_id]
    movie = Movie.find(id)

    @current_user.liked_movies.create(movie:)
  end

  def destroy
    id = params.permit(:id)[:id]
    favorite_movie = @current_user.liked_movies.find_by(movie_id: id)
    favorite_movie.delete
  end

  def most_liked
    render status: 200, json: { mostLiked: Movie.format_movies(Movie.all.order(like_count: :desc).take(10))}
  end
end