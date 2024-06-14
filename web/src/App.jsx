import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Layout from './Layout';
import SignIn from './pages/SignIn';
import FavoriteMovies from './pages/FavoriteMovies';

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [
    { index: true, element: <Home /> },
    { path: '/sign_up', element: <SignUp /> },
    { path: '/sign_in', element: <SignIn /> },
    { path: '/favorite_movies', element: <FavoriteMovies />}
  ],
}]);

function App() {
  return (<RouterProvider router={router} />)
}

export default App
