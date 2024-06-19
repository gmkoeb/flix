import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import Cookies from 'js-cookie'
import { Link } from "react-router-dom"
import { ChevronRight } from 'lucide-react';
import { checkSession } from "../lib/checkSession"
import { api } from "../../api/axios"
import { CSSTransition } from 'react-transition-group';
import { getFavoriteMovies } from "../lib/getFavoriteMovies";
import { checkIfMovieIsFavorited } from "../lib/checkIfMovieIsFavorited";

export default function Home(){
  const [genres, setGenres] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [favoriteMovies, setFavoriteMovies] = useState([])
  const [linkHovered, setLinkHovered] = useState(null)

  async function getGenres(){
    const response = await api.get('/genres')
    setGenres(response.data.genres)
  }
  
  useEffect(() => {
    if (Cookies.get('token')) {
      checkSession(setIsLoggedIn)
      getGenres()
      getFavoriteMovies(setFavoriteMovies)
    }
  }, []);

  return(
      <>
        { isLoggedIn ? (
        <section className="mx-10 mt-10">
        {genres.map(genre => (
          <section id="section" className="mb-10" key={genre.id}>
            <div className="flex align-middle mx-2">
              <Link to={`/movies/${genre.name}`} className="text-2xl font-bold mb-3 flex items-center hover:cursor-pointer">
                {linkHovered === genre.name ? (
                  <span className="z-10">{genre.name}</span>
                ) : (
                  <span onMouseEnter={() => setLinkHovered(genre.name)}>{genre.name}</span>
                )
                }
                <CSSTransition
                  in={linkHovered === genre.name} 
                  timeout={500}
                  classNames="seeAll"
                  unmountOnExit>
                  <div onMouseLeave={() => setLinkHovered(null)} className="flex h-fit w-fit items-center">
                    <span className="text-sm ml-4 mt-[6px]">See all</span>
                    <ChevronRight strokeWidth={3} width={26} height={26} className="-mb-1"/>
                  </div>
                </CSSTransition>
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {genre.movies.map(movie => (
                <MovieCard 
                  key={movie.id} 
                  id={movie.id}
                  title={movie.title} 
                  description={movie.description}
                  duration={movie.duration}
                  actors={movie.actors}
                  releaseDate={movie.release_date}
                  movieGenres={movie.movie_genres}
                  isFavorite={checkIfMovieIsFavorited(movie, favoriteMovies)} />
              ))}
            </div>
          </section>
        ))}
        </section>
      ) : (
        <section>
          <h2 className="text-5xl font-extrabold text-center mt-32 text-gray-50">Unlimited movies, TV shows, and more</h2>
          <p className="text-center text-xl font-semibold my-5">Watch anywhere. Cancel anytime.</p>
          <p className="text-center text-xl">Ready to watch? Sign up right now to create your membership </p>
          <Link 
            className="px-10 py-2 rounded-lg bg-red-600 text-white 
                       hover:bg-opacity-75 hover:duration-300 flex items-center 
                       w-fit text-center mx-auto mt-5 text-3xl font-semibold 
                       align-middle" to={'/sign_up'}>
            Get Started <ChevronRight className="ml-1 mt-1" width={36} height={36} />
          </Link>
        </section>
      )}
    </>
  )
}