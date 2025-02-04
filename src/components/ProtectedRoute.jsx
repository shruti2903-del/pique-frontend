import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }, []);
  
    if (isLoggedIn === null) {
      return <div>Loading...</div>;  
    }
  
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />; 
    }
  return <>{children}</>;
}

