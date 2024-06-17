import Cookies from 'js-cookie'
import { api } from '../../api/axios'

export async function checkSession(setIsLoggedIn){
  const authorization = {
    headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
    }
  }
  const response = await api.get('/check_session', authorization)

  if (response.data.session === 'Authorized'){
    setIsLoggedIn(true)
  } else {
    setIsLoggedIn(false)
  }
}