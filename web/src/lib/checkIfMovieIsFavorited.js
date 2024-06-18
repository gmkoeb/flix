export function checkIfMovieIsFavorited(movie, favoriteMovies){
  const includes = favoriteMovies.some(favoriteMovie => favoriteMovie.id === movie.id)
  if (includes){
    return true
  } else {
    return false
  }
}