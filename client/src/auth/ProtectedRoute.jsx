import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserRoutes = ({children}) => {
   const { user } = useSelector((s) => s.auth);
   //    console.log("Route + " + user)
   if (user) return <Navigate to={`/${user.role}`} />
   return children ? children : <Outlet />
}

const RoleRoutes = ({ requiredRole }) => {
   const { user } = useSelector((s) => s.auth);
   if (!user) return <Navigate to={'/'} />
   if (user.role !== requiredRole) return <Navigate to={'/'} />
   if (user.role == requiredRole) return <Outlet />
}

export { UserRoutes, RoleRoutes };
