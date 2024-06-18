class GenresController < ApplicationController
  before_action :authenticate_user
  
  def index
    render status: 200, json: { genres: Genre.all }
  end

  def show
    genre = Genre.find_by("name LIKE ?", "%#{params[:id]}")
    pp genre.movies
    render status: 200, json: { movies: Movie.format_movies(genre.movies) }
  end
end