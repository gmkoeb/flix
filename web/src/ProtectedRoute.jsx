import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './components/Header';
import { useState, useEffect } from 'react';
const ProtectedRoute = ({ checkAuth }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const auth = await checkAuth()
      setIsAuthenticated(auth)
    };

    checkAuthentication()
  }, [checkAuth])

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign_in" replace />;
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ProtectedRoute