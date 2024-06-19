import { api } from "../../api/axios"

export async function getFavoriteMovies(setFavoriteMovies){
  const response = await api.get('/favorite_movies')
  setFavoriteMovies(response.data.favoriteMovies)
}