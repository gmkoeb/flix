import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { checkSession } from "../lib/checkSession";
import { api } from "../../api/axios";

export default function Header(){
  const handleLinkActivation = ({ isActive }) => {
    if (isActive) {
      return 'font-bold'
    }
    return 'hover:font-bold duration-300'
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
      checkSession(setIsLoggedIn)
  }, [])
  

  function handleLogout(){
    const authorization = {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    }
    api.delete('/logout', authorization)
      .then(response => {
        Cookies.remove('token')
        Cookies.remove('user')
        window.location.reload()
      })
      .catch(error => {
        console.error('There was an error making the request!', error);
      });
  }
  return(
    <header>
      <nav className="flex p-5 items-center justify-between">
        <NavLink className="text-3xl font-bold text-red-600 mx-4" to={'/'}>Netflix</NavLink>
        { isLoggedIn ? ( 
          <>
            <div className="flex gap-5 absolute left-[15rem]">
              <NavLink className={handleLinkActivation} to={'/'}>Home</NavLink>
              <NavLink className={handleLinkActivation} to={'/favorite_movies'}>Favorite Movies</NavLink>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex gap-3">
                <User color="rgb(220 38 38)" />
                <h5 className="font-semibold text-red-600 text-md">{Cookies.get('user')}</h5>
              </div>
              <button onClick={handleLogout} className="px-5 py-2 rounded-lg mr-3 text-white hover:bg-red-600 hover:duration-300">Sign Out</button>
            </div>
          </>
          ) : (    
            <div>
              <NavLink to={'/sign_up'} className="px-5 py-2 rounded-lg mr-3 text-white hover:bg-red-600 hover:duration-300">Sign Up</NavLink>
              <NavLink to={'/sign_in'} className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-opacity-75 hover:duration-300">Sign In</NavLink>
            </div>
          )
        }
      </nav>
    </header>
  )
}