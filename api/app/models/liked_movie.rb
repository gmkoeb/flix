class LikedMovie < ApplicationRecord
  belongs_to :user
  belongs_to :movie

  after_create :increment_like_count

  private

  def increment_like_count
    movie = Movie.find(movie_id)
    like_count = movie.like_count
    movie.update(like_count: like_count + 1)
  end
end
