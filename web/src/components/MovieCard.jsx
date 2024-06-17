import { useState, useRef, useEffect } from "react"
import { Play, Plus, ThumbsUp, CircleCheck, CircleChevronDown } from "lucide-react"
import { api } from "../../api/axios"
import Cookies from 'js-cookie'
import { CSSTransition } from 'react-transition-group';
import { Tooltip } from 'react-tooltip'

export default function MovieCard(props){
  const [showControls, setShowControls] = useState('hidden')
  const [isFavorite, setIsFavorite] = useState(props.isFavorite)
  const [toggleDescription, setToggleDescription] = useState(false)
  const mouseEnterTimeoutRef = useRef(null)
  const mouseLeaveTimeoutRef = useRef(null)

  function toSnakeCase(title){
    const lowerCased = title.toLowerCase()
    return lowerCased.replace(/ /g, '_')
  }

  function cardWrapperToggle(){
    if (toggleDescription) {
      return 'absolute w-[100vw] h-[100vh] z-100 bg-black bg-opacity-50'
    } 
  }

  function isToggled(){
    if (toggleDescription) {
      return 'absolute w-[45%] right-0 left-[27%] z-100 bg-[#111111] rounded-lg h-fit duration-300'
    } else{
      return 'bg-[#111111] rounded-lg w-[20rem] h-fit hover:scale-110 duration-300 delay-300 hover:cursor-pointer'
    }
  }

  function handleToggledImage(){
    if(toggleDescription){
      return 'h-[25rem] rounded-b-none img-toggled'
    }
  }
  
  async function handleAddFavoriteMovie(movie_id){
    setIsFavorite(true)
    const body = {
      movie_id: movie_id
    }
    await api.post('/favorite_movies', body, { headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
    } })
  }

  async function handleRemoveFavoriteMovie(movie_id){
    setIsFavorite(false)
    const authorization = {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }
  
    await api.delete(`/favorite_movies/${movie_id}`, authorization)
    if (props.onRemove) {
      props.onRemove(movie_id)
    }
  }

  function handleToggleDescription(){
    if (toggleDescription) {
      setToggleDescription(false)
    } else {
      setToggleDescription(true)
    }
  }   

  function handleMouseEnter(){
    clearTimeout(mouseLeaveTimeoutRef.current);
    mouseEnterTimeoutRef.current = setTimeout(() => {
      setShowControls('');
    }, 300);
  };

  function handleMouseLeave(){
    if (!toggleDescription) {
      clearTimeout(mouseEnterTimeoutRef.current);
      mouseLeaveTimeoutRef.current = setTimeout(() => {
        setShowControls('hidden')
      }, 300)
    }
  };

  function handleClickOut(){
    setToggleDescription(false)
    setShowControls('hidden')
  }
  useEffect(() => {
    setIsFavorite(props.isFavorite);
  }, [props.isFavorite])
  return(
    <>
      <section onClick={() => handleClickOut()} className={`${cardWrapperToggle()} -translate-y-10`}>
      </section>
      <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} 
          className={`${isToggled()}`}>
        <img className={`w-[100%] h-48 rounded-lg ${handleToggledImage()}`} src={`./src/assets/posters/${toSnakeCase(props.title)}.png`} alt="" />
        <div className={`${showControls} p-5`}>
          <h3 className="text-xl font-bold text-center mb-8">{props.title}</h3>
          <div className="flex gap-2 items-center justify-between mb-5">
            <div className="flex gap-2 items-center">
              <div className="flex bg-slate-200 w-36 text-black rounded justify-center py-1 mr-1 hover:cursor-pointer">
                <Play fill="black" className="mr-2"/>
                <h5>Watch Now</h5>
              </div>
              {isFavorite ? (
                <>
                  <CircleCheck className="hover:cursor-pointer" data-tooltip-id="removeFavorite" data-tooltip-content="Remove from favorites" onClick={() => handleRemoveFavoriteMovie(props.id)} width={32} height={32}/>
                  <Tooltip id="removeFavorite" />
                </>
              ) : (
                <>
                  <Plus data-tooltip-id="addFavorite" data-tooltip-content="Add to favorites" onClick={() => handleAddFavoriteMovie(props.id)} strokeWidth={3} width={28} height={28} className="hover:cursor-pointer border-2 rounded-full p-1 font-bold"/>
                  <Tooltip id="addFavorite" />
                </>
              )}
              <ThumbsUp width={28} height={28} className="border-2 rounded-full p-1 hover:cursor-pointer" />
            </div>
            <CircleChevronDown data-tooltip-id="movieDetails" data-tooltip-content="Details" onClick={() => handleToggleDescription()} className="hover:cursor-pointer" width={32} height={32}/>
            <Tooltip id="movieDetails" />
          </div>
          <CSSTransition
            in={toggleDescription}
            timeout={300}
            classNames="section"
            unmountOnExit
            >
            <section className={`section`}  >
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
            </section>
          </CSSTransition>
        </div>
      </div>
    </>
  )
}