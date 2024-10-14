import React, {useEffect} from 'react';
import ChatPage from "./ChatPage";
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
    <>
      <ChatPage />
    </>
  );
};

export default RootPage;
