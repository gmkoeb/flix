class Movie < ApplicationRecord
  has_and_belongs_to_many :genres
  has_and_belongs_to_many :actors

  def self.format_movies(movies)
    movies.map do |movie|
      {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        release_date: movie.release_date,
        duration: movie.duration,
        actors: Genre.format_actors(movie),
        movie_genres: Genre.format_genres(movie)
      }
    end
  end
end
