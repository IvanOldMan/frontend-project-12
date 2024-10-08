import React, {useEffect} from 'react';
import GeneralPage from "./GeneralPage";
import {useNavigate} from "react-router-dom";

const RootPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentToken = localStorage.getItem('AUTH_TOKEN');
    if (!currentToken) {
      navigate('/login');
    }
  }, [])

  return (
    <div>
      <GeneralPage />
    </div>
  );
};

export default RootPage;
