import Cookies from 'js-cookie'
import axios from "axios"

export async function checkSession(setIsLoggedIn){
  const authorization = {
    headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
    }
  }
  const response = await axios.get('http://localhost:3000/check_session', authorization)

  if (response.data.session === 'Authorized'){
    setIsLoggedIn(true)
  } else {
    setIsLoggedIn(false)
  }
}