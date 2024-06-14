class Genre < ApplicationRecord
  has_and_belongs_to_many :movies

  def as_json(options = {})
    super(options).merge({
                          'movies' => self.class.format_movies(self),
                        }).except('created_at', 'updated_at')
  end

  def self.format_movies(genre)
    genre.movies.includes(:actors, :genres).map do |movie|
      {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        release_date: movie.release_date,
        duration: movie.duration,
        actors: format_actors(movie),
        movie_genres: format_genres(movie)
      }
    end
  end

  def self.format_actors(movie)
    movie.actors.map do |actor|
      {
        id: actor.id,
        name: actor.name
      }
    end
  end

  def self.format_genres(movie)
    movie.genres.map do |genre|
      {
        id: genre.id,
        name: genre.name
      }
    end
  end
end
