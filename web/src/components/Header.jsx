import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import axios from "axios"
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { checkSession } from "../lib/checkSession";

export default function Header(){
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
    axios.delete('http://localhost:3000/logout', authorization)
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
        <Link className="text-3xl font-bold text-red-600 mx-4" to={'/'}>Netflix</Link>
        { isLoggedIn ? ( 
          <>
            <div className="flex gap-5 absolute left-[15rem]">
              <Link className="font-bold" to={'/'}>Home</Link>
              <Link to={'/favorite_movies'}>Favorite Movies</Link>
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
              <Link to={'/sign_up'} className="px-5 py-2 rounded-lg mr-3 text-white hover:bg-red-600 hover:duration-300">Sign Up</Link>
              <Link to={'/sign_in'} className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-opacity-75 hover:duration-300">Sign In</Link>
            </div>
          )
        }
      </nav>
    </header>
  )
}