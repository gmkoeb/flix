import { api } from "../../api/axios"

export async function getLikedMovies(setLikedMovies){
  const response = await api.get('/liked_movies')
  setLikedMovies(response.data.likedMovies)
}