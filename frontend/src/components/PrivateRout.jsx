import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import selectors from '../store/slices/selectors.js';
import path from '../utils/routes.js';

const PrivateRout = ({ children }) => {
  const isHaveToken = !!useSelector(selectors.token);

  return (
    isHaveToken ? children : <Navigate to={path.pages.login()} replace />
  );
};

export default PrivateRout;
