import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import MovieCard from "../components/MovieCard"
import { api } from "../../api/axios"

export default function FavoriteMovies(){
  const [favoriteMovies, setFavoriteMovies] = useState([])
  
  const handleRemoveFavorite = (id) => {
    setFavoriteMovies(favoriteMovies.filter(movie => movie.id !== id))
  }
  async function getFavoriteMovies(){
    const authorization = {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }
    const response = await api.get('/favorite_movies', authorization)
    setFavoriteMovies(response.data.favoriteMovies)
  }
  useEffect(() => {
    getFavoriteMovies()
  }, [])
  return(
    <section>
      <h2 className="text-2xl font-bold mb-3 hover:cursor-pointer text-center">Favorite Movies</h2>
      <div className="flex flex-wrap gap-5 justify-center mt-10">
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
              onRemove={handleRemoveFavorite} />
        ))}
      </div>
    </section>
  )
}