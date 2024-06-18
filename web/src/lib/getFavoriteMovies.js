import { api } from "../../api/axios"
import Cookies from 'js-cookie'

export async function getFavoriteMovies(setFavoriteMovies){
  const authorization = {
    headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
    }
  }
  const response = await api.get('/favorite_movies', authorization)
  setFavoriteMovies(response.data.favoriteMovies)
}