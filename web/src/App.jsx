import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Start from './Start';
import SignIn from './pages/SignIn';
import FavoriteMovies from './pages/FavoriteMovies';
import ProtectedRoute from './ProtectedRoute';
import Cookies from 'js-cookie'
import { api } from '../api/axios';

async function isAuthenticated() {
  const token = Cookies.get('token')

  if (!token) {
    return false
  }

  try {
    const authorization = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    const response = await api.get('/check_session', authorization);

    return response.data.session === 'Authorized';
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />,
    children: [
      { index: true, element: <Home /> },
      { path: '/sign_up', element: <SignUp /> },
      { path: '/sign_in', element: <SignIn /> },
    ],
  },
  {
    element: <ProtectedRoute checkAuth={isAuthenticated}/>,
    children: [
      {
        path: '/favorite_movies', element: <FavoriteMovies /> 
      }
    ]
  }
]);

function App() {
  return (<RouterProvider router={router} />)
}

export default App
