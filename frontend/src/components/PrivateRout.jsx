import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../store/slices/selectors.js';
import path from '../utils/routes.js';

const PrivateRout = ({ children }) => {
  const isAuth = useSelector(selectIsAuth);

  return (
    isAuth ? children : <Navigate to={path.pages.login()} replace />
  );
};

export default PrivateRout;
