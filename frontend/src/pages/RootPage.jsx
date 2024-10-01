import React, {useEffect} from 'react';
import GeneralPage from "./GeneralPage";
import {useNavigate} from "react-router-dom";

const RootPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      navigate('/login');
    }
  }, [localStorage])

  return (
    <div>
      <GeneralPage />
    </div>
  );
};

export default RootPage;
