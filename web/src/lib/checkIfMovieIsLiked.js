export function checkIfMovieIsLiked(movie, likedMovies){
  const includes = likedMovies.some(likedMovie => likedMovie.id === movie.id)
  if (includes){
    return true
  } else {
    return false
  }
}
