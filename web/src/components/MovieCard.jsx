import { useState, useRef } from "react"
import { Play, Plus, ThumbsUp, CircleCheck } from "lucide-react"
import axios from "axios"
import Cookies from 'js-cookie'

export default function MovieCard(props){
  const [showDetails, setShowDetails] = useState('hidden')
  const [isFavorite, setIsFavorite] = useState(props.isFavorite)
  const [unfavorite, setUnfavorite] = useState(false)
  const mouseEnterTimeoutRef = useRef(null);
  const mouseLeaveTimeoutRef = useRef(null);

  function toSnakeCase(title){
    const lowerCased = title.toLowerCase()
    return lowerCased.replace(/ /g, '_')
  }

  async function handleAddFavoriteMovie(movie_id){
    setIsFavorite(true)
    setUnfavorite(false)
    const body = {
      movie_id: movie_id
    }
    await axios.post('http://localhost:3000/favorite_movies', body, { headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
    } })
  }

  async function handleRemoveFavoriteMovie(movie_id){
    const authorization = {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }
    setUnfavorite(true)
    await axios.delete(`http://localhost:3000/favorite_movies/${movie_id}`, authorization)
  }

  const handleMouseEnter = () => {
    clearTimeout(mouseLeaveTimeoutRef.current);
    mouseEnterTimeoutRef.current = setTimeout(() => {
      setShowDetails('');
    }, 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(mouseEnterTimeoutRef.current);
    mouseLeaveTimeoutRef.current = setTimeout(() => {
      setShowDetails('hidden');
    }, 300);
  };
  return(
    <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} 
         className="bg-gray-950 rounded-lg w-[15%] h-fit hover:scale-150 hover:w-[25vw] hover:translate-x-[5vw] duration-300 delay-300 hover:cursor-pointer">
      <img className="w-[100%] h-48 rounded-lg" src={`/posters/${toSnakeCase(props.title)}.png`} alt="" />
      <div className={`${showDetails} p-5`}>
        <h3 className="text-xl font-bold text-center mb-8">{props.title}</h3>
        <div className="flex gap-2 items-center mb-4">     
          <div className="flex bg-slate-200 w-36 text-black rounded justify-center py-1 mr-1">
            <Play fill="black" className="mr-2"/>
            <h5>Watch Now</h5>
          </div>
          {props.isFavorite || isFavorite && !unfavorite ? (
            <>
              <CircleCheck onClick={() => handleRemoveFavoriteMovie(props.id)} width={32} height={32}/>
              <ThumbsUp width={28} height={28} className="border-2 rounded-full p-1" />
            </>
          ) : (
            <>
              <Plus onClick={() => handleAddFavoriteMovie(props.id)} strokeWidth={3} width={28} height={28} className="border-2 rounded-full p-1 font-bold"/>
              <ThumbsUp width={28} height={28} className="border-2 rounded-full p-1" />
            </>
          )}
        </div>
        <p>{props.description}</p>
        <div className="flex gap-5 mt-3">
          <p>{new Date(props.releaseDate).getFullYear()}</p>
          <p>{props.duration} minutes</p>
        </div>
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold mt-5">Cast</h3>
            <section>
              {props.actors.map(actor => (
                <div key={actor.id}>
                  <h4>{actor.name}</h4>
                </div>
              ))}
            </section>
          </div>
          <div>
            <h3 className="text-lg font-semibold mt-5">Genres</h3>
            <section>
              {props.movieGenres.map(genre => (
                <div key={genre.id}>
                  <p>{genre.name}</p>
                </div>
              ))}
            </section>
          </div>
      </div>
      </div>
    </div>
  )
}