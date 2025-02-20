import React from 'react';
import { useSelector } from '../../services/store';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Preloader } from '@ui';

interface TProtectedRouteProps {
  children: React.ReactNode;
  unAuthRoute?: boolean;
}

const ProtectedRoute = ({
  children,
  unAuthRoute = false
}: TProtectedRouteProps) => {
  const { user, loading, isAuth } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) {
    return <Preloader />;
  }
  if (unAuthRoute && isAuth) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  if (!unAuthRoute && !isAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
