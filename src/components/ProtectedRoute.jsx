// import React, { useEffect, useState } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// export default function ProtectedRoute({ allowedRoles }) {
//     const [isAuthenticated, setIsAuthenticated] = useState(null);
//     const [userRole, setUserRole] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const role = localStorage.getItem('role'); // Ensure role is stored in localStorage

//         setIsAuthenticated(!!token);
//         setUserRole(role);
//     }, []);

//     if (isAuthenticated === null) {
//         return <div>Loading...</div>;
//     }

//     if (!isAuthenticated) {
//         return <Navigate to="/login" replace />;
//     }

//     return <Outlet />; // Render the nested routes inside the ProtectedRoute
// }

import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [role, setRole] = useState(null);

  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");
  useEffect(() => {
    const checkAuth = () => {
      if (token && storedRole) {
        setIsLoggedIn(true);
        setRole(storedRole);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth();

    // Listen for login/logout events from localStorage
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [storedRole, token]);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/error" replace />; // Redirect to error page if role not allowed
  }

  return <Outlet />;
}
