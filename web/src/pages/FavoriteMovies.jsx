import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import { Link } from "react-router-dom"
import { getFavoriteMovies } from "../lib/getFavoriteMovies"
import { getLikedMovies } from "../lib/getLikedMovies"
import { checkIfMovieIsLiked } from "../lib/checkIfMovieIsLiked"

export default function FavoriteMovies(){
  const [favoriteMovies, setFavoriteMovies] = useState([])
  const [likedMovies, setLikedMovies] = useState([])

  const handleRemoveFavorite = (id) => {
    setFavoriteMovies(favoriteMovies.filter(movie => movie.id !== id))
  }

  useEffect(() => {
    getFavoriteMovies(setFavoriteMovies)
    getLikedMovies(setLikedMovies)
  }, [])
  return(
    <section>
      <h2 className="text-2xl font-bold mb-3 hover:cursor-pointer text-center">Favorite Movies</h2>
      <div className="flex flex-wrap gap-5 justify-center mt-10">
        {favoriteMovies.length > 0 ? (
          <>
            {favoriteMovies.map(movie => (
                <MovieCard 
                  key={movie.id} 
                  id={movie.id}
                  title={movie.title} 
                  description={movie.description}
                  duration={movie.duration}
                  actors={movie.actors}
                  releaseDate={movie.release_date}
                  movieGenres={movie.movie_genres}
                  isFavorite={true}
                  isLiked={checkIfMovieIsLiked(movie, likedMovies)}
                  onRemove={handleRemoveFavorite} />
            ))}
          </>
        ) : (
          <h2 className="text-gray-400 mt-20">You have added no favorite movies to your movies list. <Link className="underline" to={'/'}>Click here to browse our full catalog.</Link></h2>
        )}
      </div>
    </section>
  )
}