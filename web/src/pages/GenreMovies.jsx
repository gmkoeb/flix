import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { api } from "../../api/axios"
import MovieCard from "../components/MovieCard"
import { ChevronRight } from "lucide-react"
import { checkIfMovieIsFavorited } from "../lib/checkIfMovieIsFavorited"

export default function GenreMovies(){
  let { genre } = useParams()
  const [movies, setMovies] = useState([])
  const [favoriteMovies, setFavoriteMovies] = useState([])


  async function getFavoriteMovies(){
    const response = await api.get('/favorite_movies')
    setFavoriteMovies(response.data.favoriteMovies)
  }

  async function getGenreMovies(){
    const response = await api.get(`/genres/${genre}`)
    setMovies(response.data.movies)
  }

  useEffect(() => {
    getGenreMovies()
    getFavoriteMovies()
  }, [])
  return(
    <>
      <div className="flex items-center">
        <Link className="w-fit block ml-9 text-md" to={'/'}>Home</Link>
        <ChevronRight/>
        <p className="font-bold text-3xl -mt-1">{genre}</p>
      </div>
      <h1 className="text-center capitalize font-semibold text-3xl">{genre} Movies</h1>
      <section className="flex justify-center mt-10 gap-2">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            id={movie.id}
            title={movie.title} 
            description={movie.description}
            duration={movie.duration}
            actors={movie.actors}
            releaseDate={movie.release_date}
            movieGenres={movie.movie_genres}
            isFavorite={checkIfMovieIsFavorited(movie, favoriteMovies)}
          />
        ))}
      </section>
    </>
  )
}